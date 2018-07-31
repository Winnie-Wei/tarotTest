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

var top = app.globalData.clientHeight-100,imgList = [];
var name = ["queen", "king", "swords10", "couple", "angel", "wands1", "man", "wheel", "women", "justic"];
for (var i = 0; i < name.length; i++ ) {
  imgList.push({ "id": name[i], "src": "../../image/waiteTarot/"+ name[i] +".jpg", "left": i*40, "top": top, "zindexF": 2, "zindexB": 1, "transF": "", "transB": "rotateY(180deg)", "position": "absolute" })
}
// var imgList = [
//   { "id": "queen", "src": "../../image/waiteTarot/queen.jpg", "left": 0, "top": top, "zindexF": 2, "zindexB": 1, "transF": "", "transB": "rotateY(180deg)" },
//   { "id": "king", "src": "../../image/waiteTarot/king.jpg", "left": 40, "top": 100, "zindexF": 2, "zindexB": 1, "transF": "", "transB": "rotateY(180deg)" },
//   { "id": "swords10", "src": "../../image/waiteTarot/swords10.jpg", "left": 80, "top": 100, "zindexF": 2, "zindexB": 1, "transF": "", "transB": "rotateY(180deg)" },
//   { "id": "couple", "src": "../../image/waiteTarot/couple.jpg", "left": 120, "top": 100, "zindexF": 2, "zindexB": 1, "transF": "", "transB": "rotateY(180deg)" },
//   { "id": "angel", "src": "../../image/waiteTarot/angel.jpg", "left": 160, "top": 100, "zindexF": 2, "zindexB": 1, "transF": "", "transB": "rotateY(180deg)" },
//   { "id": "wands1", "src": "../../image/waiteTarot/wands1.jpg", "left": 200, "top": 100, "zindexF": 2, "zindexB": 1, "transF": "", "transB": "rotateY(180deg)" },
//   { "id": "man", "src": "../../image/waiteTarot/man.jpg", "left": 240, "top": 100, "zindexF": 2, "zindexB": 1, "transF": "", "transB": "rotateY(180deg)" },
//   { "id": "wheel", "src": "../../image/waiteTarot/wheel.jpg", "left": 280, "top": 100, "zindexF": 2, "zindexB": 1, "transF": "", "transB": "rotateY(180deg)" },
//   { "id": "women", "src": "../../image/waiteTarot/women.jpg", "left": 320, "top": 100, "zindexF": 2, "zindexB": 1, "transF": "", "transB": "rotateY(180deg)" },
//   { "id": "justic", "src": "../../image/waiteTarot/justic.jpg", "left": 360, "top": 100, "zindexF": 2, "zindexB": 1, "transF": "", "transB": "rotateY(180deg)" }
// ]


  // 定义数据出口  
  module.exports = {
    postList: localData,
    noteItem: noteItem,
    imgList: imgList
  }