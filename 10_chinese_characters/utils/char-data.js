/**
 * 汉字数据 - 初级（10个字）
 * 拼音、释义、笔顺等基础信息
 */

const CHARACTERS = [
  {
    char: "一",
    pinyin: "yī",
    meaning: "one / single / a",
    strokeCount: 1,
    radical: "一",
    examples: "一个, 一起, 第一",
    category: "数字",
  },
  {
    char: "二",
    pinyin: "èr",
    meaning: "two / 2",
    strokeCount: 2,
    radical: "二",
    examples: "二月, 第二, 二手",
    category: "数字",
  },
  {
    char: "三",
    pinyin: "sān",
    meaning: "three / 3",
    strokeCount: 3,
    radical: "一",
    examples: "三个, 三月, 再三",
    category: "数字",
  },
  {
    char: "人",
    pinyin: "rén",
    meaning: "person / people",
    strokeCount: 2,
    radical: "人",
    examples: "人们, 大人, 人口",
    category: "人物",
  },
  {
    char: "大",
    pinyin: "dà",
    meaning: "big / large / great",
    strokeCount: 3,
    radical: "大",
    examples: "大小, 大学, 大家",
    category: "描述",
  },
  {
    char: "山",
    pinyin: "shān",
    meaning: "mountain / hill",
    strokeCount: 3,
    radical: "山",
    examples: "山水, 火山, 山上",
    category: "自然",
  },
  {
    char: "口",
    pinyin: "kǒu",
    meaning: "mouth / opening",
    strokeCount: 3,
    radical: "口",
    examples: "口水, 门口, 人口",
    category: "身体",
  },
  {
    char: "日",
    pinyin: "rì",
    meaning: "sun / day",
    strokeCount: 4,
    radical: "日",
    examples: "日子, 生日, 日出",
    category: "自然",
  },
  {
    char: "月",
    pinyin: "yuè",
    meaning: "moon / month",
    strokeCount: 4,
    radical: "月",
    examples: "月亮, 五月, 月光",
    category: "自然",
  },
  {
    char: "水",
    pinyin: "shuǐ",
    meaning: "water / liquid",
    strokeCount: 4,
    radical: "水",
    examples: "水果, 河水, 水分",
    category: "自然",
  },
];

module.exports = { CHARACTERS };
