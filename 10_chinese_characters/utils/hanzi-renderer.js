/**
 * HanziRenderer - 基于 Canvas 2D 的汉字笔顺渲染器
 *
 * 适用于微信小程序 Canvas 2D API
 * 笔画数据来自本地 stroke-data.js，无需 CDN。
 *
 * 数据格式:
 * {
 *   strokes: ["M 300 415 Q 383 ... Z", ...],  // SVG path (fill shapes)
 *   medians: [[[x,y],[x,y],...], ...]          // 笔画中线点
 * }
 */

const { STROKE_DATA } = require("./stroke-data");

// SVG path 命令解析 (M, L, Q, C, Z)
function parseSvgPath(pathStr) {
  const commands = [];
  const parts = pathStr.trim().split(/\s+/);
  let i = 0;

  while (i < parts.length) {
    const cmd = parts[i];
    if (["M", "L", "Q", "C", "Z"].includes(cmd)) {
      if (cmd === "Z") {
        commands.push({ cmd: "Z", coords: [] });
        i++;
      } else {
        const coords = [];
        i++;
        while (i < parts.length && !["M", "L", "Q", "C", "Z"].includes(parts[i])) {
          coords.push(parseFloat(parts[i]));
          i++;
        }
        commands.push({ cmd, coords });
      }
    } else {
      i++;
    }
  }
  return commands;
}

// 坐标缩放变换 (原始坐标系: 1024x1024, Y 轴向上)
function transformPoint(x, y, scale, offsetX, offsetY) {
  return {
    x: offsetX + (x * scale) / 1024,
    y: offsetY + ((1024 - y) * scale) / 1024,
  };
}

// 两点距离计算
function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// 路径首尾端点
function pathEndpoints(pts) {
  if (!pts || pts.length === 0) return { start: null, end: null };
  return { start: pts[0], end: pts[pts.length - 1] };
}

// 路径总长度
function pathLength(pts) {
  let len = 0;
  for (let i = 1; i < pts.length; i++) {
    len += distance(pts[i - 1], pts[i]);
  }
  return len;
}

// 判断点是否在线段附近 (带容差)
function isNearSegment(pt, a, b, tolerance) {
  const ab = { x: b.x - a.x, y: b.y - a.y };
  const ap = { x: pt.x - a.x, y: pt.y - a.y };
  const t = Math.max(0, Math.min(1, (ap.x * ab.x + ap.y * ab.y) / Math.max(ab.x * ab.x + ab.y * ab.y, 0.01)));
  const closest = { x: a.x + t * ab.x, y: a.y + t * ab.y };
  return distance(pt, closest) <= tolerance;
}

// 判断路径方向是否与参考路径大致一致
function directionMatches(userPts, refPts, tolerance) {
  if (userPts.length < 2 || refPts.length < 2) return false;
  const uStart = userPts[0];
  const uEnd = userPts[userPts.length - 1];
  const rStart = refPts[0];
  const rEnd = refPts[refPts.length - 1];

  // 方向向量
  const uDir = { x: uEnd.x - uStart.x, y: uEnd.y - uStart.y };
  const rDir = { x: rEnd.x - rStart.x, y: rEnd.y - rStart.y };

  // 点积判断方向 (忽略反向)
  const dot = uDir.x * rDir.x + uDir.y * rDir.y;
  return dot >= 0; // 同向或垂直
}

class HanziRenderer {
  constructor(canvas, ctx, options = {}) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.dpr = options.dpr || 1;

    this.width = options.width || 300;
    this.height = options.height || 300;
    this.padding = options.padding || 30;

    this.strokeColor = options.strokeColor || "#333333";
    this.outlineColor = options.outlineColor || "#D0D0D0";
    this.highlightColor = options.highlightColor || "#E74C3C";
    this.drawingColor = options.drawingColor || "#333333";
    this.guideColor = options.guideColor || "rgba(231, 76, 60, 0.25)";

    this.strokeAnimationSpeed = options.strokeAnimationSpeed || 1;
    this.delayBetweenStrokes = options.delayBetweenStrokes || 800;

    this.character = "";
    this.charData = null;
    this.loaded = false;
    this.outlineVisible = true;
    this.characterVisible = true;
    this.animating = false;

    this.strokePaths = [];
    this.scaledPaths = [];
    this.scaledMedians = []; // 缩放后的中线坐标

    // 描红/测验状态
    this.quizActive = false;
    this.quizStrokeIndex = 0;
    this.quizMistakes = 0;
    this.quizTotalMistakes = 0;
    this.quizMistakesOnStroke = 0;
    this.quizDrawing = false;
    this.quizUserPoints = []; // 当前笔画的触摸点
    this.quizCompletedStrokes = []; // 已完成的笔画索引
    this._quizCallbacks = {};
  }

  async loadCharacter(char) {
    this.character = char;
    this.loaded = false;

    try {
      const data = await this._fetchCharData(char);
      this.charData = data;
      this._parseStrokes();
      this.loaded = true;
      this._render();
      return true;
    } catch (err) {
      console.error("Failed to load character data:", char, err);
      return false;
    }
  }

  async _fetchCharData(char) {
    const data = STROKE_DATA[char];
    if (!data) {
      throw new Error(`No stroke data for character: ${char}`);
    }
    return data;
  }

  _parseStrokes() {
    if (!this.charData || !this.charData.strokes) return;
    this.strokePaths = this.charData.strokes.map(parseSvgPath);
  }

  _computeScaledPaths() {
    const drawSize = Math.min(
      this.width - this.padding * 2,
      this.height - this.padding * 2
    );
    const offsetX = this.padding;
    const offsetY = this.padding;

    this.scaledPaths = this.strokePaths.map((commands) =>
      commands.map(({ cmd, coords }) => {
        if (cmd === "Z") return { cmd: "Z", coords: [] };
        const pts = [];
        for (let i = 0; i < coords.length; i += 2) {
          const pt = transformPoint(coords[i], coords[i + 1], drawSize, offsetX, offsetY);
          pts.push(pt.x, pt.y);
        }
        return { cmd, coords: pts };
      })
    );

    // 计算缩放后的中线坐标
    if (this.charData && this.charData.medians) {
      this.scaledMedians = this.charData.medians.map((median) =>
        median.map(([x, y]) => transformPoint(x, y, drawSize, offsetX, offsetY))
      );
    } else {
      this.scaledMedians = [];
    }
  }

  _pathToContext(ctx, commands) {
    ctx.beginPath();
    for (const { cmd, coords } of commands) {
      switch (cmd) {
        case "M":
          ctx.moveTo(coords[0], coords[1]);
          break;
        case "L":
          ctx.lineTo(coords[0], coords[1]);
          break;
        case "Q":
          ctx.quadraticCurveTo(coords[0], coords[1], coords[2], coords[3]);
          break;
        case "C":
          ctx.bezierCurveTo(coords[0], coords[1], coords[2], coords[3], coords[4], coords[5]);
          break;
        case "Z":
          ctx.closePath();
          break;
      }
    }
  }

  _fillStroke(strokeIndex, color, alpha) {
    const path = this.scaledPaths[strokeIndex];
    if (!path) return;
    const ctx = this.ctx;
    ctx.save();
    if (alpha !== undefined) ctx.globalAlpha = alpha;
    ctx.fillStyle = color || this.strokeColor;
    this._pathToContext(ctx, path);
    ctx.fill();
    ctx.restore();
  }

  _strokeOutline(strokeIndex, color, lineWidth) {
    const path = this.scaledPaths[strokeIndex];
    if (!path) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = color || this.outlineColor;
    ctx.lineWidth = lineWidth || 1.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    this._pathToContext(ctx, path);
    ctx.stroke();
    ctx.restore();
  }

  _clear() {
    const ctx = this.ctx;
    const dpr = this.dpr;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.width * dpr, this.height * dpr);
    ctx.restore();
  }

  _render() {
    if (!this.loaded) return;

    this._clear();
    this._computeScaledPaths();

    // 描红模式：只显示轮廓 + 已完成笔画 + 当前笔画的引导框
    if (this.quizActive) {
      this._renderQuizMode();
      return;
    }

    // 标准模式
    if (this.outlineVisible) {
      for (let i = 0; i < this.scaledPaths.length; i++) {
        this._strokeOutline(i, this.outlineColor, 0.8);
      }
    }
    if (this.characterVisible) {
      for (let i = 0; i < this.scaledPaths.length; i++) {
        this._fillStroke(i, this.strokeColor);
      }
    }
  }

  /**
   * 描红模式渲染
   */
  _renderQuizMode() {
    const currentIdx = this.quizStrokeIndex;

    // 已完成笔画：正常填充
    for (const idx of this.quizCompletedStrokes) {
      this._fillStroke(idx, this.strokeColor);
    }

    // 当前待写笔画的引导 — 用引导色填充 + 加粗轮廓
    if (currentIdx < this.scaledPaths.length) {
      this._fillStroke(currentIdx, this.guideColor, 0.35);
      this._strokeOutline(currentIdx, this.highlightColor, 2);
    }

    // 未写笔画：灰色轮廓
    for (let i = currentIdx + 1; i < this.scaledPaths.length; i++) {
      this._strokeOutline(i, this.outlineColor, 0.6);
    }
  }

  /**
   * 笔顺动画
   */
  async animateCharacter(onComplete, onStrokeStart) {
    if (!this.loaded || this.animating) return;
    this.animating = true;

    this.characterVisible = false;
    this.outlineVisible = true;
    this._render();

    await this._delay(400);

    const total = this.scaledPaths.length;
    const animDuration = 600 / this.strokeAnimationSpeed;

    for (let i = 0; i < total; i++) {
      if (!this.animating) break;
      if (onStrokeStart) onStrokeStart(i + 1, total);
      await this._animateStrokeFill(i, animDuration);
      await this._delay(this.delayBetweenStrokes);
    }

    this.animating = false;
    this.outlineVisible = false;
    this.characterVisible = true;
    this._render();

    if (onComplete) onComplete();
  }

  async _animateStrokeFill(strokeIndex, duration) {
    const ctx = this.ctx;
    const dpr = this.dpr;
    const self = this;
    const steps = 20;
    const stepTime = duration / steps;

    for (let step = 0; step <= steps; step++) {
      if (!self.animating) break;
      const progress = step / steps;
      const alpha = 0.1 + progress * 0.9;

      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, this.width * dpr, this.height * dpr);
      ctx.restore();

      for (let j = 0; j < this.scaledPaths.length; j++) {
        this._strokeOutline(j, this.outlineColor, 0.8);
      }
      for (let j = 0; j < strokeIndex; j++) {
        this._fillStroke(j, this.strokeColor);
      }
      if (progress < 1) {
        this._fillStroke(strokeIndex, this.highlightColor, alpha);
      } else {
        this._fillStroke(strokeIndex, this.strokeColor);
      }
      await this._delay(stepTime);
    }
  }

  // ============================================================
  //  描红测验模式 (Touch Tracing)
  // ============================================================

  /**
   * 启动描红测验
   */
  startQuiz(callbacks = {}) {
    if (!this.loaded) return;
    this._quizCallbacks = callbacks;
    this.quizActive = true;
    this.quizStrokeIndex = 0;
    this.quizMistakes = 0;
    this.quizTotalMistakes = 0;
    this.quizMistakesOnStroke = 0;
    this.quizCompletedStrokes = [];
    this.quizUserPoints = [];
    this.quizDrawing = false;

    this.outlineVisible = false;
    this.characterVisible = false;
    this._render();
  }

  /**
   * 取消测验
   */
  cancelQuiz() {
    this.quizActive = false;
    this.quizDrawing = false;
    this.quizUserPoints = [];
    this._quizCallbacks = {};
    this.reset();
  }

  /**
   * Canvas touch 事件处理入口
   */
  handleTouchStart(x, y) {
    if (!this.quizActive) return;
    this.quizDrawing = true;
    this.quizUserPoints = [{ x, y }];
    this._drawUserStroke(x, y, true);
  }

  handleTouchMove(x, y) {
    if (!this.quizActive || !this.quizDrawing) return;
    this.quizUserPoints.push({ x, y });
    this._drawUserStroke(x, y, false);
  }

  handleTouchEnd() {
    if (!this.quizActive || !this.quizDrawing) return;
    this.quizDrawing = false;
    this._gradeCurrentStroke();
  }

  /**
   * 在画布上绘制用户的笔画
   */
  _drawUserStroke(cx, cy, isStart) {
    const ctx = this.ctx;
    const dpr = this.dpr;

    // 先重绘 quiz 模式画面
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.width * dpr, this.height * dpr);
    ctx.restore();

    // 渲染 quiz 引导层
    this._renderQuizMode();

    // 渲染已完成的 stroke 填充
    for (const idx of this.quizCompletedStrokes) {
      this._fillStroke(idx, this.strokeColor);
    }

    // 绘制用户正在画的笔画
    const pts = this.quizUserPoints;
    if (pts.length >= 2) {
      ctx.save();
      ctx.strokeStyle = this.highlightColor;
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        // 用二次贝塞尔平滑
        const prev = pts[i - 1];
        const curr = pts[i];
        const mx = (prev.x + curr.x) / 2;
        const my = (prev.y + curr.y) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, mx, my);
      }
      ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
      ctx.stroke();
      ctx.restore();
    } else if (pts.length === 1) {
      ctx.save();
      ctx.fillStyle = this.highlightColor;
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  /**
   * 对用户刚完成的笔画进行评分
   */
  _gradeCurrentStroke() {
    const idx = this.quizStrokeIndex;
    const userPts = this.quizUserPoints;
    const refMedian = this.scaledMedians[idx];
    const callbacks = this._quizCallbacks;

    if (!refMedian || refMedian.length < 2) {
      // 无法评分，直接通过
      this._markStrokeCorrect(idx);
      return;
    }

    const tolerance = Math.max(25, pathLength(refMedian) * 0.25);

    // 评分项 1: 用户笔画长度
    const uLen = pathLength(userPts);
    const rLen = pathLength(refMedian);
    const lengthRatio = uLen / Math.max(rLen, 1);
    const lengthOk = lengthRatio > 0.2 && lengthRatio < 3.0;

    // 评分项 2: 起点是否在参考笔画起点附近
    const startOk =
      userPts.length > 0 &&
      distance(userPts[0], refMedian[0]) < tolerance * 1.2;

    // 评分项 3: 终点在终点附近
    const endOk =
      userPts.length > 0 &&
      distance(userPts[userPts.length - 1], refMedian[refMedian.length - 1]) < tolerance * 1.2;

    // 评分项 4: 方向一致
    const dirOk = directionMatches(userPts, refMedian, tolerance);

    // 综合判断
    const pass = lengthOk && (startOk || endOk) && dirOk;

    if (pass) {
      this._markStrokeCorrect(idx);
    } else {
      this._markStrokeMistake(idx);
    }
  }

  _markStrokeCorrect(strokeNum) {
    this.quizMistakesOnStroke = 0;
    this.quizCompletedStrokes.push(strokeNum);
    this.quizStrokeIndex++;
    this.quizUserPoints = [];

    const callbacks = this._quizCallbacks;
    if (callbacks.onCorrectStroke) {
      callbacks.onCorrectStroke({
        totalMistakes: this.quizTotalMistakes,
        strokeNum,
        strokesRemaining: this.scaledPaths.length - this.quizStrokeIndex,
      });
    }

    // 检查是否全部完成
    if (this.quizStrokeIndex >= this.scaledPaths.length) {
      this._quizComplete();
    } else {
      this._clear();
      this._render(); // 刷引导
    }
  }

  _markStrokeMistake(strokeNum) {
    this.quizTotalMistakes++;
    this.quizMistakesOnStroke++;
    this.quizUserPoints = [];

    // 震动反馈（小程序环境）
    try {
      wx.vibrateShort({ type: "medium" });
    } catch (_) {}

    const callbacks = this._quizCallbacks;
    if (callbacks.onMistake) {
      callbacks.onMistake({
        totalMistakes: this.quizTotalMistakes,
        strokeNum,
        mistakesOnStroke: this.quizMistakesOnStroke,
      });
    }

    // 连续 3 次错误，短暂高亮提示正确笔画位置
    if (this.quizMistakesOnStroke >= 3) {
      this._flashHint(strokeNum);
    }

    this._clear();
    this._render(); // 重新渲染，等待用户重试
  }

  /**
   * 提示闪烁 — 短暂显示正确笔画填充
   */
  async _flashHint(strokeNum) {
    const duration = 400;
    const steps = 8;
    const stepTime = duration / steps;

    for (let step = 0; step <= steps; step++) {
      if (!this.quizActive) break;
      const progress = step / steps;
      // 闪烁：alpha 先升后降
      const alpha = progress < 0.5 ? progress * 2 : (1 - progress) * 2;

      this._clear();
      this._renderQuizMode();
      for (const idx of this.quizCompletedStrokes) {
        this._fillStroke(idx, this.strokeColor);
      }
      this._fillStroke(strokeNum, this.highlightColor, alpha * 0.4);

      await this._delay(stepTime);
    }

    this._clear();
    this._render();
  }

  _quizComplete() {
    this.quizActive = false;
    const callbacks = this._quizCallbacks;

    // 显示完整字
    this.characterVisible = true;
    this.outlineVisible = false;
    this._render();

    if (callbacks.onComplete) {
      callbacks.onComplete({
        character: this.character,
        totalMistakes: this.quizTotalMistakes,
      });
    }

    this._quizCallbacks = {};
  }

  /**
   * 跳过当前笔画 (给用户的不写选项)
   */
  skipStroke() {
    if (!this.quizActive) return;
    const idx = this.quizStrokeIndex;
    this.quizMistakesOnStroke = 0;
    this.quizCompletedStrokes.push(idx);
    this.quizStrokeIndex++;
    this.quizUserPoints = [];

    if (this.quizStrokeIndex >= this.scaledPaths.length) {
      this._quizComplete();
    } else {
      this._clear();
      this._render();
    }
  }

  toggleOutline(show) {
    this.outlineVisible = show;
    this._render();
  }

  reset() {
    this.animating = false;
    this.quizActive = false;
    this.quizDrawing = false;
    this.quizUserPoints = [];
    this.characterVisible = true;
    this.outlineVisible = true;
    this._render();
  }

  updateOptions(options) {
    if (options.strokeColor !== undefined) this.strokeColor = options.strokeColor;
    if (options.outlineColor !== undefined) this.outlineColor = options.outlineColor;
    if (options.width !== undefined) this.width = options.width;
    if (options.height !== undefined) this.height = options.height;
    if (options.padding !== undefined) this.padding = options.padding;
    this._render();
  }

  _delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

module.exports = { HanziRenderer };
