const { CHARACTERS } = require("../../utils/char-data");
const { HanziRenderer } = require("../../utils/hanzi-renderer");
const { STROKE_DATA } = require("../../utils/stroke-data");

function toTonedPinyin(pinyin) {
  if (!pinyin || typeof pinyin !== 'string') return pinyin || '';
  var TM={a:["ā","á","ǎ","à","a"],e:["ē","é","ě","è","e"],i:["ī","í","ǐ","ì","i"],o:["ō","ó","ǒ","ò","o"],u:["ū","ú","ǔ","ù","u"],v:["ǖ","ǘ","ǚ","ǜ","ü"]};
  var m=pinyin.match(/(\d)$/);
  var t=m?parseInt(m[1]):5;
  var b=pinyin.replace(/\d$/,"");
  if(t===5)return b;
  var v="a";
  if(b.indexOf("a")>=0)v="a";else if(b.indexOf("e")>=0)v="e";else if(b.indexOf("o")>=0)v="o";else if(b.indexOf("iu")>=0)v="u";else if(b.indexOf("ui")>=0)v="i";else if(b.indexOf("i")>=0)v="i";else if(b.indexOf("u")>=0)v="u";else if(b.indexOf("v")>=0)v="v";else return b;
  var av=(TM[v]||[])[t-1]||v;
  return b.replace(v,av);
}

Page({
  data: {
    charData: null,
    currentChar: "",
    canvasSize: 320,
    mode: "idle", // idle | animate | quiz
    currentStroke: 0,
    totalStrokes: 0,
    guideText: "点击「笔顺演示」查看书写顺序",
    mistakeCount: 0, // 当前笔画错误次数
    totalMistakes: 0, // 总错误次数
    quizDone: false,
    loading: true,
  },

  renderer: null,
  _destroyed: false,
  _initRetries: 0,
  _maxInitRetries: 20,

  onLoad(options) {
    this._destroyed = false;
    const char = decodeURIComponent(options.char || "");
    const charData = CHARACTERS.find((c) => c.char === char);
    if (charData) {
      this.setData({
        charData: { ...charData, pinyin: toTonedPinyin(charData.pinyin) },
        currentChar: char,
        totalStrokes: charData.strokeCount,
      });
      wx.setNavigationBarTitle({ title: `练字 · ${char}` })
    }

    setTimeout(() => this.initCanvas(), 300);
  },

  initCanvas() {
    if (this._destroyed) return;
    if (this._initRetries >= this._maxInitRetries) {
      this.setData({ loading: false });
      wx.showToast({ title: "画布初始化失败", icon: "none" });
      return;
    }

    this._initRetries++;
    const query = wx.createSelectorQuery();
    query
      .select("#hanzi-canvas")
      .fields({ node: true, size: true })
      .exec((res) => {
        if (this._destroyed) return;

        if (!res || !res[0] || !res[0].node) {
          setTimeout(() => this.initCanvas(), 200);
          return;
        }

        const canvas = res[0].node;
        const ctx = canvas.getContext("2d");
        const dpr = wx.getSystemInfoSync().pixelRatio;

        canvas.width = this.data.canvasSize * dpr;
        canvas.height = this.data.canvasSize * dpr;
        ctx.scale(dpr, dpr);

        this.renderer = new HanziRenderer(canvas, ctx, {
          width: this.data.canvasSize,
          height: this.data.canvasSize,
          padding: 36,
          strokeColor: "#333333",
          outlineColor: "#D5D5D5",
          highlightColor: "#E74C3C",
          guideColor: "rgba(231, 76, 60, 0.22)",
          dataSource: STROKE_DATA,
          dpr,
        });

        this.loadCharacter();
      });
  },

  /**
   * Canvas 触摸事件 — WXML 绑定
   * e.touches[0].x / .y 是相对于 canvas 的 CSS 像素坐标
   * 因为已 ctx.scale(dpr, dpr)，坐标直接对应用
   */
  onCanvasTouchStart(e) {
    if (!this.renderer || !this.renderer.quizActive) return;
    const touch = e.touches[0];
    if (!touch) return;
    this.renderer.handleTouchStart(touch.x, touch.y);
  },

  onCanvasTouchMove(e) {
    if (!this.renderer || !this.renderer.quizActive) return;
    const touch = e.touches[0];
    if (!touch) return;
    this.renderer.handleTouchMove(touch.x, touch.y);
  },

  onCanvasTouchEnd() {
    if (!this.renderer || !this.renderer.quizActive) return;
    this.renderer.handleTouchEnd();
  },

  onCanvasTouchCancel() {
    if (!this.renderer || !this.renderer.quizActive) return;
    this.renderer.quizDrawing = false;
  },

  async loadCharacter() {
    if (this._destroyed || !this.renderer) return;

    this.setData({ loading: true });
    const success = await this.renderer.loadCharacter(this.data.currentChar);

    if (this._destroyed) return;
    this.setData({ loading: false });

    if (!success) {
      wx.showToast({ title: "加载失败", icon: "none" });
    }
  },

  /* ========== 笔顺演示 ========== */

  async showStrokeOrder() {
    if (this._destroyed || !this.renderer) return;
    // 已经在动画中，不重复触发
    if (this.renderer.animating) return;

    // 取消可能正在进行的 quiz
    if (this.renderer.quizActive) {
      this.renderer.cancelQuiz();
    }
    if (this.renderer.quizActive) {
      this.renderer.cancelQuiz();
    }

    this.setData({ mode: "animate", guideText: "请观察笔画顺序...", quizDone: false });

    const self = this;
    await this.renderer.animateCharacter(
      () => {
        if (self._destroyed) return;
        self.setData({
          mode: "idle",
          guideText: "演示完成！点击「描红练字」在画布上跟着写",
          currentStroke: self.data.totalStrokes,
        });
        self.markAsLearned();
      },
      (current, total) => {
        if (self._destroyed) return;
        self.setData({
          currentStroke: current,
          guideText: `第 ${current} 画 / 共 ${total} 画`,
        });
      }
    );
  },

  /* ========== 描红练字 ========== */

  startQuiz() {
    if (this._destroyed || !this.renderer) return;

    // 已经在描红中，不重复启动（除非已完成）
    if (this.renderer.quizActive && !this.data.quizDone) return;
    this.renderer.animating = false;

    const self = this;
    this.renderer.startQuiz({
      onCorrectStroke: (data) => {
        if (self._destroyed) return;
        const next = data.strokeNum + 2;
        const total = self.data.totalStrokes;
        self.setData({
          currentStroke: data.strokeNum + 1,
          mistakeCount: 0,
          guideText: next <= total
            ? `✓ 第 ${data.strokeNum + 1} 画完成！接着写第 ${next} 画`
            : "最后一画了！",
        });
      },
      onMistake: (data) => {
        if (self._destroyed) return;
        self.setData({
          mistakeCount: data.mistakesOnStroke,
          totalMistakes: data.totalMistakes,
          guideText: `✗ 再试一次 第 ${data.strokeNum + 1} 画（错误 ${data.mistakesOnStroke} 次）`,
        });
      },
      onComplete: (data) => {
        if (self._destroyed) return;
        self.setData({
          mode: "idle",
          quizDone: true,
          currentStroke: self.data.totalStrokes,
          totalMistakes: data.totalMistakes,
          guideText: data.totalMistakes === 0
            ? "🎉 完美！一笔都没错！"
            : `🎉 完成了！错误 ${data.totalMistakes} 次，继续加油`,
        });
        self.markAsLearned();

        // 震动反馈
        try { wx.vibrateShort({ type: "heavy" }); } catch (_) {}
      },
    });

    this.setData({
      mode: "quiz",
      guideText: "按笔顺在画布上描红，从第 1 画开始",
      currentStroke: 0,
      mistakeCount: 0,
      totalMistakes: 0,
      quizDone: false,
    });
  },

  /**
   * 跳过当前笔画
   */
  skipCurrentStroke() {
    if (!this.renderer || !this.renderer.quizActive) return;
    this.renderer.skipStroke();

    const next = this.renderer.quizStrokeIndex;
    this.setData({
      currentStroke: next,
      mistakeCount: 0,
      guideText: `已跳过，请写第 ${next + 1} 画`,
    });
  },

  /* ========== 发音 ========== */

  playSound() {
    const { charData } = this.data;
    if (!charData) return;

    // 停止之前的播放
    if (this._audioCtx) {
      this._audioCtx.destroy();
    }

    const audio = wx.createInnerAudioContext();
    audio.src = `/10_chinese_characters/audio/${charData.char}.mp3`;
    audio.play();
    this._audioCtx = audio;

    audio.onError((err) => {
      console.warn("Audio play failed:", err);
    });
  },

  /* ========== 重置 ========== */

  resetCanvas() {
    if (!this.renderer) return;
    if (this.renderer.quizActive) {
      this.renderer.cancelQuiz();
    }
    this.renderer.animating = false;
    this.renderer.reset();
    this.setData({
      mode: "idle",
      currentStroke: 0,
      mistakeCount: 0,
      totalMistakes: 0,
      quizDone: false,
      guideText: "点击「笔顺演示」查看书写顺序",
    });
  },

  /* ========== 学习状态 ========== */

  markAsLearned() {
    const { currentChar } = this.data;
    try {
      const learned = wx.getStorageSync("learned_chars") || [];
      if (!learned.includes(currentChar)) {
        learned.push(currentChar);
        wx.setStorageSync("learned_chars", learned);
      }
    } catch (err) {
      console.warn("Failed to save learned status", err);
    }
  },

  onUnload() {
    this._destroyed = true;
    if (this._audioCtx) {
      this._audioCtx.destroy();
      this._audioCtx = null;
    }
    if (this.renderer) {
      this.renderer.animating = false;
      if (this.renderer.quizActive) this.renderer.cancelQuiz();
      this.renderer = null;
    }
  },
});
