const app = getApp();
import { menuConfig } from '../docs/menu.js';
const contents = require('../docs/contents.js');
const towxml = app.towxml;

Page({
  data: {
    menuList: [],
    article: {},
    showMenu: false,
    book: {},
    currentTitle: '',
    contentId: '',
    codeTexts: [],   // 所有代码块的文本
  },

  onLoad: function(options) {
    this.data.book = options;
    wx.setNavigationBarTitle({ title: options.title || "iBookstack" });
    this.setData({
      menuList: menuConfig[0].children || menuConfig,
      currentTitle: this.getBookTitle(menuConfig)
    });
    if (options.id) {
      this.loadContent(options.id);
      const title = this.findTitleById(options.id, menuConfig);
      if (title) this.setData({ currentTitle: title, contentId: options.id });
    }
  },

  getBookTitle(menuList) {
    if (menuList[0] && menuList[0].title) return menuList[0].title;
    if (menuList[0] && menuList[0].children && menuList[0].children[0])
      return menuList[0].children[0].title;
    return '';
  },

  findTitleById(id, menuList) {
    for (const item of menuList) {
      if (item.id === id) return item.title;
      if (item.children && item.children.length > 0) {
        const result = this.findTitleById(id, item.children);
        if (result) return result;
      }
    }
    return null;
  },

  selectMenuItem(e) {
    const { id } = e.currentTarget.dataset;
    const title = this.findTitleById(id, menuConfig);
    this.loadContent(id);
    this.setData({
      showMenu: false,
      currentTitle: title || '',
      contentId: id
    });
  },

  toggleMenu() {
    this.setData({ showMenu: !this.data.showMenu });
  },

  closeMenu() {
    this.setData({ showMenu: false });
  },

  loadContent(id) {
    const content = contents[id];
    const _ts = this;

    // 1. 提取所有代码块文本和语言标记
    const codeTexts = [];
    const codeLangs = [];
    const processed = content.replace(/```(\w*)\n?([\s\S]*?)```/g, (match, lang, code) => {
      codeTexts.push(code.replace(/\n$/, ''));
      codeLangs.push(lang || 'code');
      return match;
    });

    // 2. 转为节点树，同时注册 tap 事件处理复制按钮
    let obj = towxml(String(processed), 'markdown', {
      events: {
        tap: (e) => {
          try {
            const nodeData = e.currentTarget.dataset.data;
            if (nodeData && nodeData.attrs && nodeData.attrs['data-code-idx'] !== undefined) {
              const idx = parseInt(nodeData.attrs['data-code-idx']);
              const text = _ts.data.codeTexts[idx];
              if (text) {
                wx.setClipboardData({
                  data: text,
                  success: () => {
                    wx.showToast({ title: '已复制', icon: 'none', duration: 1500 });
                  },
                });
              }
            }
          } catch(err) {}
        },
        change: e => {}
      }
    });

    // 3. 遍历节点树，为每个代码块注入语言标签（点击即复制）
    const injected = this.injectCodeLabels(obj, codeTexts, codeLangs);

    _ts.setData({
      article: injected,
      codeTexts,
    });
  },

  // 给代码块注入语言标签（右上角，点击复制）
  injectCodeLabels(node, codeTexts, codeLangs) {
    if (!node || !node.children) return node;

    let codeIdx = 0;
    const walk = (children) => {
      if (!children) return;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.tag === 'view' && child.attrs && child.attrs.class && 
            child.attrs.class.indexOf('h2w__pre') !== -1) {
          if (!child.children) child.children = [];
          const lang = codeLangs[codeIdx] || 'code';
          const label = { sql: 'SQL', js: 'JS', json: 'JSON', bash: 'Bash', go: 'Go', py: 'Python', java: 'Java', ts: 'TS', css: 'CSS', html: 'HTML', xml: 'XML', yaml: 'YAML', md: 'Markdown', shell: 'Shell', php: 'PHP', c: 'C', cpp: 'C++', rust: 'Rust' }[lang] || (lang === 'code' ? '复制' : lang);
          child.children.push({
            tag: 'view',
            attrs: {
              class: 'code-lang-tag',
              'data-code-idx': String(codeIdx),
            },
            children: [{ text: label }],
          });
          codeIdx++;
        }
        if (child.children) walk(child.children);
      }
    };
    walk(node.children);
    return node;
  },

  // 复制代码
  // 注：复制功能通过 towxml 的 tap 事件实现，详见 loadContent

  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => resolve({ title: this.data.book.title }), 2000);
    });
    return {
      title: this.data.book.title,
      path: `/${this.data.book.id}/pages/index?id=${this.data.book.id}&title=${this.data.book.title}`,
      promise
    };
  },
  onShareTimeline() {
    const promise = new Promise(resolve => {
      setTimeout(() => resolve({ title: this.data.book.title }), 2000);
    });
    return {
      title: this.data.book.title,
      path: `/${this.data.book.id}/pages/index?id=${this.data.book.id}&title=${this.data.book.title}`,
      promise
    };
  }
})
