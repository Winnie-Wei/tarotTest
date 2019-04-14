// 本地模拟数据  
var app = getApp();
var localData = [
  {
    "id": "wt1",
    "name": "ace-cups"
  },
  {
    "id": "wt2",
    "name": "ace-pentacles"
  },
  {
    "id": "wt3",
    "name": "wands1"
  },
  {
    "id": "wt4",
    "name": "日本文学"
  },
  {
    "id": "wt5",
    "name": "日本文学"
  },
  {
    "id": "wt6",
    "name": "日本文学"
  },
  {
    "id": "wt7",
    "name": "日本文学"
  },
  {
    "id": "wt8",
    "name": "日本文学"
  }
];

var noteItem = [
  { "id": 1, "title": "我这三个月的运势怎么样1？", "time": "2018-12-22 22:22:22" },
  { "id": 2, "title": "我这三个月的运势怎么样2？", "time": "2018-12-22 22:22:22" },
  { "id": 3, "title": "我这三个月的运势怎么样3？", "time": "2018-12-22 22:22:22" },
  { "id": 4, "title": "我这三个月的运势怎么样4？", "time": "2018-12-22 22:22:22" },
  { "id": 5, "title": "我这三个月的运势怎么样5？", "time": "2018-12-22 22:22:22" },
  { "id": 6, "title": "我这三个月的运势怎么样6？", "time": "2018-12-22 22:22:22" },
  { "id": 7, "title": "我这三个月的运势怎么样7？", "time": "2018-12-22 22:22:22" },
  { "id": 8, "title": "我这三个月的运势怎么样8？", "time": "2018-12-22 22:22:22" },
  { "id": 9, "title": "我这三个月的运势怎么样9？", "time": "2018-12-22 22:22:22" },
  { "id": 10, "title": "我这三个月的运势怎么样10？", "time": "2018-12-22 22:22:22" },
];

var top = app.globalData.clientHeight-110,imgList = [];
var name = [
  "fool",
  "magician",
  "high-priestess",
  "empress",
  "emperor",
  "hierophant",
  "lovers",
  "chariot",
  "strength",
  "hermit",
  "fortune-wheel",
  "justice",
  "hanged-man",
  "death",
  "temperance",
  "devil",
  "tower",
  "stars",
  "moon",
  "sun",
  "judgement",
  "world",
  "ace-wands",
  "two-wands",
  "three-wands",
  "four-wands",
  "five-wands",
  "six-wands",
  "seven-wands",
  "eight-wands",
  "nine-wands",
  "ten-wands",
  "page-wands",
  "knight-wands",
  "queen-wands",
  "king-wands",
  "ace-cups",
  "two-cups",
  "three-cups",
  "four-cups",
  "five-cups",
  "six-cups",
  "seven-cups",
  "eight-cups",
  "nine-cups",
  "ten-cups",
  "page-cups",
  "knight-cups",
  "queen-cups",
  "king-cups",
  "ace-swords",
  "two-swords",
  "three-swords",
  "four-swords",
  "five-swords",
  "six-swords",
  "seven-swords",
  "eight-swords",
  "nine-swords",
  "ten-swords",
  "page-swords",
  "knight-swords",
  "queen-swords",
  "king-swords",
  "ace-pentacles",
  "two-pentacles",
  "three-pentacles",
  "four-pentacles",
  "five-pentacles",
  "six-pentacles",
  "seven-pentacles",
  "eight-pentacles",
  "nine-pentacles",
  "ten-pentacles",
  "page-pentacles",
  "knight-pentacles",
  "queen-pentacles",
  "king-pentacles",
];
// for (var i = 0; i < name.length; i++ ) {
//   imgList.push({ "id": name[i], "src": "../../image/waiteTarot/" + name[i] + ".jpg", "left": i * 40, "top": top, "zindexF": 12, "zindexB": 11, "transF": "", "transB": "rotateY(180deg)", "position": "absolute", "shownum": false,"dragkey":0 })
// };


  // 定义数据出口  
  module.exports = {
    postList: localData,
    noteItem: noteItem,
    //po: po
   // nameList: name
  }