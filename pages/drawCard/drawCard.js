var tarotList = require('../../data/tarotName.js');
var app = getApp();
const ctx = wx.createCanvasContext('img');
const ctxs = wx.createCanvasContext('shuffle');
Page({
  data: {
    clientWidth: '',
    clientHeight: '',
    scrollkey: true,
    scrollLeft: 0,
    drawPanel: true,
    nameList: [],
    shuffleCardCanvas: false,
    isShuffle: false,
    movalbeAnimation: false, //movable-view禁止动画
    numArray: [{
      "s": "0",
      "e": "78"
    }, {
      "s": "0",
      "e": "22"
    }, {
      "s": "22",
      "e": "78"
    }],
    typeArray: ['waiteTarot', 'newSight'],
    cardType: '', //当前使用的牌种
    shufCard: [],//保存铺牌数组
    choseArr:[],//保存选中数组
    chosenCount: 0,//选牌计数
  },
  onLoad: function(options) {
    options = {
      num: 0,
      type: 0
    }
    this.setData({
      clientHeight: app.globalData.clientHeight,
      clientWidth: app.globalData.clientWidth,
      nameList: tarotList.nameList.slice(this.data.numArray[options.num].s, this.data.numArray[options.num].e),
      cardType: this.data.typeArray[options.type],
    });
  },

  tapChoose:function(e){
    console.log(e)
    let arr = this.data.shufCard;
    //++this.data.chosenCount;
    this.data.choseArr.push(e.currentTarget.dataset.index);
    let eindex = e.currentTarget.dataset.index;
    arr[eindex].tag = this.data.choseArr.findIndex((value)=>{
      return value == eindex;
    }) + 1;
    console.log(this.data.shufCard[eindex]);
    this.setData({
      shufCard: arr
    });
  },

  tapCancel: function (e) {
    let arr = this.data.shufCard;
    let eindex = e.currentTarget.dataset.index;
    let delindex = this.data.choseArr.findIndex((value) => {
      return value == eindex;
    });
    //this.data.choseArr.splice(delindex,1);
    for (const value of this.data.choseArr) {
      console.log(value);
    }
    this.setData({
      shufCard: arr
    });
  },

  //洗牌
  shuffle: function() {
    this.setData({
      shufCard: randomCard(this.data.nameList, this.data.cardType),
      drawPanel: true,
      shuffleCardCanvas: false,
      isShuffle: true,
    });
    shuffleCard(this.data.cardType);
  },
  deal: function() {
    if (!this.data.isShuffle) {
      return;
    }
    this.setData({
      shuffleCardCanvas: true,
      drawPanel: false,
    });
  }
});

function randomCard(arr, cardtype) { //打乱牌顺序
  let larr = arr;
  let i = larr.length;
  while (i) {
    let j = Math.floor(Math.random() * i--);
    [larr[j], larr[i]] = [larr[i], larr[j]];
  }
  var arrtemp = [];
  for (var k = 0; k < larr.length; k++) {
    var imgSrc = "../../image/" + cardtype + "/" + larr[k] + ".jpg"; //app.globalData.clientHeight-110
    arrtemp.push({
      "id": larr[k],
      "src": imgSrc,
      "tag": 0,
    })
  };
  console.log(arrtemp)
  return arrtemp;
}

function shuffleCard(cardtype) { //洗牌动画
  for (var i = 0; i < 60; i++) {
    var x = 0,
      y = 0,
      deg = 0,
      rx = 0,
      ry = 0;
    if (app.globalData.clientWidth < 350) {
      x = Math.random() * 160 + 50;
      y = Math.random() * 160 + 15;
      deg = Math.random() * Math.PI;
      rx = x + 50;
      ry = y + 46;
      ctxs.translate(rx, ry);
      ctxs.rotate(deg);
      ctxs.drawImage('../../image/' + cardtype + '/cardback.png', 0, 0, 35, 62);
      ctxs.rotate(-deg);
      ctxs.translate(-rx, -ry);
    } else {
      x = Math.random() * 190 + 50;
      y = Math.random() * 200 + 20;
      deg = Math.random() * Math.PI;
      rx = x + 50;
      ry = y + 46;
      ctxs.translate(rx, ry);
      ctxs.rotate(deg);
      ctxs.drawImage('../../image/' + cardtype + '/cardback.png', 25, -46, 45, 80);
      ctxs.rotate(-deg);
      ctxs.translate(-rx, -ry);
    }
  }
  ctxs.draw();
}

