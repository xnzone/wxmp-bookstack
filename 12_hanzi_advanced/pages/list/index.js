const { CHARACTERS } = require("../../utils/char-data");

function toTonedPinyin(pinyin) {
  if (!pinyin || typeof pinyin !== 'string') return pinyin || '';
  var TM={a:["ā","á","ǎ","à","a"],e:["ē","é","ě","è","e"],i:["ī","í","ǐ","ì","i"],o:["ō","ó","ǒ","ò","o"],u:["ū","ú","ǔ","ù","u"],v:["ǖ","ǘ","ǚ","ǜ","ü"]};
  var m=pinyin.match(/(\d)$/);
  var t=m?parseInt(m[1]):5;
  var b=pinyin.replace(/\d$/,"");
  if(t===5)return b;
  var v="a";
  if(b.indexOf("a")>=0)v="a";else if(b.indexOf("e")>=0)v="e";else if(b.indexOf("o")>=0)v="o";else if(b.indexOf("iu")>=0)v="u";else if(b.indexOf("ui")>=0)v="i";else if(b.indexOf("i")>=0)v="i";else if(b.indexOf("u")>=0)v="u";else if(b.indexOf("v")>=0)v="v";else return b;
  var av=(TM[v]||[])[t-1]||v;
  return b.replace(v,av);
}

Page({
  data: {
    characters: [],
    learnedCount: 0,
    totalCount: 0,
  },

  onLoad() {
    const chars = CHARACTERS.map((c) => ({ ...c, pinyin: toTonedPinyin(c.pinyin) }));
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
    wx.navigateTo({ url: `/12_hanzi_advanced/pages/practice/index?char=${encodeURIComponent(char)}` });
  },
});
