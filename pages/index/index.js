Page({
  data: {
    items: [], // 所有项目数据
    currentPage: 1, // 当前页码
    pageSize: 4, // 每页4本（2列×2行）
    totalPages: 1, // 总页数
    displayItems: [], // 当前页要显示的项目
    searchMode: false,
    searchKeyword: "",
    allBooks: [], // 搜索时的全量引用
    featureCards: [
      {
        id: "hanyu_g1",
        title: "汉字启蒙 · 一年级",
        desc: "350字 · 笔顺描红",
        chars: ["一", "人", "大", "山", "水"],
        url: "/10_chinese_characters/pages/list/index",
      },
      {
        id: "hanyu_g2",
        title: "汉字启蒙 · 二年级",
        desc: "648字 · 笔顺描红",
        chars: ["花", "鸟", "鱼", "虫", "飞"],
        url: "/11_hanzi_intermediate/pages/list/index",
      },
      {
        id: "hanyu_g3",
        title: "汉字启蒙 · 三年级",
        desc: "598字 · 笔顺描红",
        chars: ["龙", "凤", "舞", "翔", "鹤"],
        url: "/12_hanzi_advanced/pages/list/index",
      },
      {
        id: "hanyu_g4",
        title: "汉字启蒙 · 四年级",
        desc: "399字 · 笔顺描红",
        chars: ["潮", "雾", "狮", "虎", "雁"],
        url: "/13_hanzi_grade4/pages/list/index",
      },
      {
        id: "hanyu_g56",
        title: "汉字启蒙 · 五~六年级",
        desc: "500字 · 笔顺描红",
        chars: ["麒", "麟", "鹏", "凤", "鹤"],
        url: "/14_hanzi_grade56/pages/list/index",
      },
    ],
    books: [
      {
        id: "09_shanhaijing",
        title: "山海经奇珍异兽图集",
        image:
          "https://files.seeusercontent.com/2026/06/02/8ktG/20260602095727385.png",
        date: "2026-06-01",
      },
      {
        id: "01_mysql_45",
        title: "MySQL实战45讲",
        image: "https://s2.loli.net/2024/12/13/V6uozBDJpPvs3GT.png",
        date: "2024-03-06",
      },
      {
        id: "02_redisdoc",
        title: "Redis命令参考",
        image: "https://s2.loli.net/2024/12/13/xA4Lw2cMUWjgqTt.png",
        date: "2024-03-07",
      },
      {
        id: "03_distributed_systems_for_fun_and_profit",
        title: "Distributed systems: for fun and profit",
        image: "https://s2.loli.net/2024/12/13/5lBunbrezopdIih.png",
        date: "2024-09-10",
      },
      {
        id: "04_distributed_systems_for_fun_and_profit_zh",
        title: "趣谈分布式系统",
        image: "https://s2.loli.net/2024/12/13/654ATVyeQCaq7vu.png",
        date: "2024-09-10",
      },
      {
        id: "05_golang_note",
        title: "Go语言编程启示录",
        image: "https://s2.loli.net/2025/01/14/LN8qyahdeu9tknH.png",
        date: "2025-01-14",
      },
      {
        id: "06_os_tutorial",
        title: "OS Tutorial",
        image: "https://s2.loli.net/2025/01/20/SbKp95zC2jEA3RL.png",
        date: "2025-01-12",
      },
      {
        id: "07_os_tutorial_zh",
        title: "从零构建操作系统",
        image: "https://s2.loli.net/2025/01/20/lLc8ivV6Y47mrIt.png",
        date: "2021-09-10",
      },
      {
        id: "08_leetcode_solution",
        title: "LeetCode分类题解",
        image: "https://s2.loli.net/2025/01/22/jOmZVuw4kMSafHK.png",
        date: "2022-06-23",
      },
    ],
  },
  onLoad: function () {
    // 假设从服务器或本地获取所有项目数据
    const allItems = this.data.books;
    this.setData({
      items: allItems,
      totalPages: Math.ceil(allItems.length / this.data.pageSize),
      displayItems: allItems.slice(0, this.data.pageSize),
    });
  },

  // 切换到下一页
  nextPage: function () {
    if (this.data.currentPage < this.data.totalPages) {
      const nextPage = this.data.currentPage + 1;
      const start = (nextPage - 1) * this.data.pageSize;
      const end = nextPage * this.data.pageSize;
      this.setData({
        currentPage: nextPage,
        displayItems: this.data.items.slice(start, end),
      });
    }
  },

  // 切换到上一页
  prevPage: function () {
    if (this.data.currentPage > 1) {
      const prevPage = this.data.currentPage - 1;
      const start = (prevPage - 1) * this.data.pageSize;
      const end = prevPage * this.data.pageSize;
      this.setData({
        currentPage: prevPage,
        displayItems: this.data.items.slice(start, end),
      });
    }
  },
  // 特色功能入口
  onFeatureTap(e) {
    const { id } = e.currentTarget.dataset;
    const card = this.data.featureCards.find((c) => c.id === id);
    if (card && card.url) {
      wx.navigateTo({ url: card.url });
    }
  },
  // 搜索 — 进入搜索模式
  onSearch() {
    this.setData({
      searchMode: true,
      searchKeyword: "",
      displayItems: this.data.books,
    });
  },
  // 搜索输入
  onSearchInput(e) {
    const keyword = e.detail.value.trim().toLowerCase();
    let filtered = this.data.books;
    if (keyword) {
      filtered = this.data.books.filter(
        (b) =>
          b.title.toLowerCase().includes(keyword) ||
          (b.date && b.date.includes(keyword))
      );
    }
    this.setData({ searchKeyword: e.detail.value, displayItems: filtered });
  },
  // 取消搜索
  onSearchCancel() {
    const allItems = this.data.books;
    this.setData({
      searchMode: false,
      searchKeyword: "",
      currentPage: 1,
      totalPages: Math.ceil(allItems.length / this.data.pageSize),
      displayItems: allItems.slice(0, this.data.pageSize),
    });
  },
  goToDetail(e) {
    const { id } = e.currentTarget.dataset;
    var title = "";
    for (let idx = 0; idx < this.data.books.length; idx++) {
      const book = this.data.books[idx];
      if (book.id === id) {
        title = book.title;
      }
    }
    wx.navigateTo({
      url: `/${id}/pages/index?id=${id}&title=${title}`,
    });
  },
  onShareAppMessage() {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          title: "iBookstack",
        });
      }, 2000);
    });
    return {
      title: "iBookstack",
      path: "/page/index/index",
      promise,
    };
  },
  onShareTimeline() {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          title: "iBookstack",
        });
      }, 2000);
    });
    return {
      title: "iBookstack",
      path: "/page/index/index",
      promise,
    };
  },
});
