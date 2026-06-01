const app = getApp();
import { menuConfig } from '../docs/menu.js';
const contents = require('../docs/contents.js');
const towxml = app.towxml;

Page({
  data: {
    menuList: [],
    article: {},
    showMenu: false,
    expandedMenu: {},
    book: {},
    // 卡片模式数据
    contentType: 'markdown',
    beasts: [],
    pageTitle: '',
    pageSubtitle: '',
    pageDesc: '',
  },

  onLoad: function(options) {
    console.log('[shanhaijing] onLoad start', options);
    console.time('[shanhaijing] load');
    this.data.book = options
    if (options.id) {
      console.log('[shanhaijing] findMenuPath start');
      const menuPath = this.findMenuPath(options.id, menuConfig);
      console.log('[shanhaijing] findMenuPath done, length:', menuPath.length);
      if (menuPath.length > 0) {
        this.setData({
          menuList:  menuPath
        });
      }
      
      console.log('[shanhaijing] loadContent start');
      this.loadContent(options.id);
      console.log('[shanhaijing] loadContent done');
    } else {
      this.setData({
        menuList: menuConfig
      });
    }
    console.timeEnd('[shanhaijing] load');
  },

  // 查找菜单路径
  findMenuPath(id, menuList, path = []) {
    for (const item of menuList) {
      const currentPath = [...path, item];
      
      if (item.id === id) {
        return currentPath;
      }
      
      if (item.children && item.children.length > 0) {
        const result = this.findMenuPath(id, item.children, currentPath);
        if (result.length > 0) {
          return result;
        }
      }
    }
    return [];
  },

  // 切换子菜单的展开/收起状态
  toggleSubMenu(e) {
    const { id } = e.currentTarget.dataset;
    const { expandedMenu } = this.data;
    
    this.setData({
      ['expandedMenu.' + id]: !expandedMenu[id]
    });
  },

  // 选择菜单项
  selectMenuItem(e) {
    const { id } = e.currentTarget.dataset;
    const children = this.findMenuChildren(id, this.data.menuList);
    if (children.length > 0) {
      this.toggleSubMenu(e);
    } else {
      this.loadContent(id);
      this.setData({
        showMenu: false
      });
    }
  },

  findMenuChildren(id, menuList) {
    for (const item of menuList) {
      if (item.id === id) {
        return item.children || [];
      }
      if (item.children && item.children.length > 0) {
        const children = this.findMenuChildren(id, item.children);
        if (children.length > 0) {
          return children;
        }
      }
    }
    return [];
  },

  // 切换菜单显示
  toggleMenu() {
    this.setData({
      showMenu: !this.data.showMenu
    });
  },

  // 获取内容
  loadContent(id) {
    console.log('[shanhaijing] loadContent id:', id);
    const content = contents[id];
    console.log('[shanhaijing] content type:', typeof content, content && content.type);
    
    // 检查是否为卡片类型数据
    if (content && content.type === 'cards') {
      console.log('[shanhaijing] card mode');
      const beasts = (content.beasts || []).map(b => ({
        ...b,
        flipped: false
      }));
      console.log('[shanhaijing] beasts count:', beasts.length);
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
    console.log('[shanhaijing] markdown mode');
    this.setData({
      contentType: 'markdown',
      beasts: []
    });
    
    const _ts = this;
    console.log('[shanhaijing] towxml start');
    let obj = towxml(String(content), 'markdown', {
      events: {
        tap: e => {
          console.log('tap', e);
        },
        change: e => {
          console.log('todo', e);
        }
      }
    });
    console.log('[shanhaijing] towxml done');
    console.log('[shanhaijing] article size:', JSON.stringify(obj).length);

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
