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
    // 卡片模式数据
    contentType: 'markdown',
    beasts: [],
    pageTitle: '',
    pageSubtitle: '',
    pageDesc: '',
    // 导航栏
    currentTitle: '山海经奇珍异兽图集',
    contentId: '',
  },

  onLoad: function(options) {
    this.data.book = options;
    wx.setNavigationBarTitle({ title: options.title || "iBookstack" });
    // 总是加载完整目录用于底部弹窗
    this.setData({
      menuList: menuConfig[0].children || menuConfig
    });

    if (options.id) {
      this.loadContent(options.id);
      const title = this.findTitleById(options.id, menuConfig);
      if (title) {
        this.setData({ currentTitle: title, contentId: options.id });
      }
    }
  },

  // 根据 id 查找标题
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

  // 选择菜单项
  selectMenuItem(e) {
    const { id } = e.currentTarget.dataset;
    const title = this.findTitleById(id, menuConfig);
    this.loadContent(id);
    this.setData({
      showMenu: false,
      currentTitle: title || '山海经奇珍异兽图集',
      contentId: id
    });
  },

  // 切换菜单显示
  toggleMenu() {
    this.setData({
      showMenu: !this.data.showMenu
    });
  },

  // 关闭菜单
  closeMenu() {
    this.setData({ showMenu: false });
  },

  // 获取内容
  loadContent(id) {
    const content = contents[id];

    // 检查是否为卡片类型数据
    if (content && content.type === 'cards') {
      const beasts = (content.beasts || []).map(b => ({
        ...b,
        flipped: false
      }));
      this.setData({
        contentType: 'cards',
        beasts: beasts,
        pageTitle: content.title || '',
        pageSubtitle: content.subtitle || '',
        pageDesc: content.description || '',
        article: {}
      });
      return;
    }

    // Markdown 模式（封面等）
    this.setData({
      contentType: 'markdown',
      beasts: []
    });

    const _ts = this;
    let obj = towxml(String(content), 'markdown', {
      events: {
        tap: e => {},
        change: e => {}
      }
    });

    _ts.setData({
      article: obj
    });
  },

  // 翻转卡片
  flipCard(e) {
    const { index } = e.currentTarget.dataset;
    const key = `beasts[${index}].flipped`;
    this.setData({
      [key]: !this.data.beasts[index].flipped
    });
  },

  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: this.data.book.title
        })
      }, 2000)
    })
    return {
      title: this.data.book.title,
      path: `/${this.data.book.id}/pages/index?id=${this.data.book.id}&title=${this.data.book.title}`,
      promise
    }
  },
  onShareTimeline() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: this.data.book.title
        })
      }, 2000)
    })
    return {
      title: this.data.book.title,
      path: `/${this.data.book.id}/pages/index?id=${this.data.book.id}&title=${this.data.book.title}`,
      promise
    }
  }
})
