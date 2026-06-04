const { CHARACTERS } = require("../../utils/char-data");

Page({
  data: {
    characters: [],
    filteredCharacters: [],
    categories: [],
    activeCategory: "全部",
    learnedCount: 0,
  },

  onLoad() {
    this.initPage();
  },

  onShow() {
    // 每次显示页面时刷新学习状态
    this.updateLearnedStatus();
  },

  initPage() {
    // 构建分类
    const categorySet = new Set(CHARACTERS.map((c) => c.category));
    const categories = [
      { name: "全部", label: "全部" },
      ...Array.from(categorySet).map((c) => ({ name: c, label: c })),
    ];

    this.setData({
      characters: CHARACTERS,
      categories,
      activeCategory: "全部",
      filteredCharacters: CHARACTERS,
    });

    this.updateLearnedStatus();
  },

  updateLearnedStatus() {
    const learnedSet = this.getLearnedSet();
    const updatedChars = CHARACTERS.map((c) => ({
      ...c,
      learned: learnedSet.has(c.char),
    }));

    const learnedCount = updatedChars.filter((c) => c.learned).length;

    this.setData({
      characters: updatedChars,
      learnedCount,
    });

    this.filterByCategory();
  },

  getLearnedSet() {
    try {
      const learned = wx.getStorageSync("learned_chars") || [];
      return new Set(learned);
    } catch {
      return new Set();
    }
  },

  switchCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({ activeCategory: category });
    this.filterByCategory();
  },

  filterByCategory() {
    const { activeCategory, characters } = this.data;
    let filtered;

    if (activeCategory === "全部") {
      filtered = characters;
    } else {
      filtered = characters.filter((c) => c.category === activeCategory);
    }

    this.setData({ filteredCharacters: filtered });
  },

  goToPractice(e) {
    const char = e.currentTarget.dataset.char;
    wx.navigateTo({
      url: `/10_chinese_characters/pages/practice/index?char=${encodeURIComponent(char)}`,
    });
  },
});
