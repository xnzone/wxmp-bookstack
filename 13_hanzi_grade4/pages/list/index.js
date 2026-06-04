const { CHARACTERS } = require("../../utils/char-data");

Page({
  data: {
    characters: [],
    filteredCharacters: [],
    categories: [],
    activeCategory: "全部",
    learnedCount: 0,
    totalCount: 0,
  },

  onLoad() {
    this.initCharacters();
  },

  onShow() {
    this.refreshLearned();
  },

  initCharacters() {
    const chars = CHARACTERS;
    this.setData({ totalCount: chars.length });

    // 提取分类
    const catMap = {};
    chars.forEach((c) => {
      const cat = c.category || "其他";
      if (!catMap[cat]) catMap[cat] = [];
      catMap[cat].push(c);
    });

    const categories = [{ name: "全部", label: "全部" }];
    Object.keys(catMap).forEach((key) => {
      categories.push({ name: key, label: key });
    });

    this.setData({ characters: chars, categories });
    this.filterByCategory("全部");
    this.refreshLearned();
  },

  refreshLearned() {
    let learned = [];
    try {
      learned = wx.getStorageSync("learned_chars") || [];
    } catch (_) {}

    const { characters, activeCategory } = this.data;
    const filtered = activeCategory === "全部"
      ? characters
      : characters.filter((c) => c.category === activeCategory);

    const marked = filtered.map((c) => ({
      ...c,
      learned: learned.includes(c.char),
    }));

    this.setData({
      filteredCharacters: marked,
      learnedCount: learned.length,
    });
  },

  filterByCategory(category) {
    this.setData({ activeCategory: category });
    this.refreshLearned();
  },

  switchCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.filterByCategory(category);
  },

  goToPractice(e) {
    const char = e.currentTarget.dataset.char;
    wx.navigateTo({ url: `/13_hanzi_grade4/pages/practice/index?char=${encodeURIComponent(char)}` });
  },
});
