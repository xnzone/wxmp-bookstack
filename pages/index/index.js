Page({
  data: {
    items: [], // 所有项目数据
    currentPage: 1, // 当前页码
    pageSize: 6, // 每页显示的项目数量
    totalPages: 1, // 总页数
    displayItems: [], // 当前页要显示的项目
    books: [
      {
        id: "01_mysql_45",
        title: 'MySQL实战45讲',
        image: 'https://s2.loli.net/2024/12/13/V6uozBDJpPvs3GT.png',
        date: '2024/03/06'
      },
      {
        id: "02_redisdoc",
        title: 'Redis命令参考',
        image: 'https://s2.loli.net/2024/12/13/xA4Lw2cMUWjgqTt.png',
        date: '2024/03/07'
      },
      {
        id: "03_distributed_systems_for_fun_and_profit",
        title: 'Distributed systems: for fun and profit',
        image: 'https://s2.loli.net/2024/12/13/5lBunbrezopdIih.png',
        date: '2024/09/10'
      },
      {
        id: "04_distributed_systems_for_fun_and_profit_zh",
        title: '趣谈分布式系统',
        image: 'https://s2.loli.net/2024/12/13/654ATVyeQCaq7vu.png',
        date: '2024/09/10'
      },
      {
        id: "05_golang_note",
        title: 'Go语言编程启示录',
        image: 'https://s2.loli.net/2025/01/14/LN8qyahdeu9tknH.png',
        date: '2025/01/14'
      }
    ]
  },
  onLoad: function () {
    // 假设从服务器或本地获取所有项目数据
    const allItems = this.data.books;
    this.setData({
      items: allItems,
      totalPages: Math.ceil(allItems.length / this.data.pageSize),
      displayItems: allItems.slice(0, this.data.pageSize)
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
        displayItems: this.data.items.slice(start, end)
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
        displayItems: this.data.items.slice(start, end)
      });
    }
  },
  // 跳转到详情页
  goToDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/${id}/pages/index?id=${id}`
    });
  }
})
