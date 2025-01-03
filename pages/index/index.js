Page({
  data: {
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
      }
    ]
  },
  // 跳转到详情页
  goToDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/${id}/pages/index?id=${id}`
    });
  }
})
