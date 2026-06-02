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
  },

  onLoad: function(options) {
    this.data.book = options;
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
    let obj = towxml(String(content), 'markdown', {
      events: {
        tap: e => {},
        change: e => {}
      }
    });
    _ts.setData({ article: obj });
  },

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
