const { CHARACTERS } = require("../../utils/char-data");

Page({
  data: {
    characters: [],
    learnedCount: 0,
    totalCount: 0,
  },

  onLoad() {
    const chars = CHARACTERS;
    this.setData({
      characters: chars,
      totalCount: chars.length,
    });
    this.refreshLearned();
  },

  onShow() {
    this.refreshLearned();
  },

  refreshLearned() {
    let learned = [];
    try {
      learned = wx.getStorageSync("learned_chars") || [];
    } catch (_) {}

    const marked = this.data.characters.map((c) => ({
      ...c,
      learned: learned.includes(c.char),
    }));

    this.setData({
      characters: marked,
      learnedCount: learned.length,
    });
  },

  goToPractice(e) {
    const char = e.currentTarget.dataset.char;
    wx.navigateTo({ url: `/14_hanzi_grade56/pages/practice/index?char=${encodeURIComponent(char)}` });
  },
});
