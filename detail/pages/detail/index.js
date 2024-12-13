const app = getApp();
import { menuConfig } from '../../docs/menu.js';
const contents = require('../../docs/contents.js');
import towxml from '../../towxml/index';

Page({
  data: {
    menuList: [],
    article: {},
    showMenu: false,
    expandedMenu: {}
  },

  onLoad: function(options) {
    console.log(options)
    if (options.id) {
      console.log(options.id);
      // 获取当前 id 对应的完整菜单路径
      const menuPath = this.findMenuPath(options.id, menuConfig);
      if (menuPath.length > 0) {
        this.setData({
          menuList:  menuPath
        });
      }
      
      this.loadContent(options.id);
    } else {
      // 如果没有指定 id，显示顶级菜单
      this.setData({
        menuList: menuConfig
      });
    }
  },

  // 查找菜单路径
  findMenuPath(id, menuList, path = []) {
    for (const item of menuList) {
      // 创建新路径
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
    console.log(e)
    const { id } = e.currentTarget.dataset;
    console.log(id)
    // 检查是否有子菜单
    const children = this.findMenuChildren(id, this.data.menuList);
    if (children.length > 0) {
      // 如果有子菜单，切换展开状态
      this.toggleSubMenu(e);
    } else {
      // 如果没有子菜单，加载内容
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
        const result = this.findMenuChildren(id, item.children);
        if (result.length > 0) {
          return result;
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
    const content = contents[id];
    const _ts = this;
			let obj = towxml(String(content),'markdown',{
				// theme:'dark',
				events:{
					tap:e => {
						console.log('tap',e);
					},
					change:e => {
						console.log('todo',e);
					}
				}});
	

			_ts.setData({
				article:obj
      });
  }
})
