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
    panelKey: "shuffleCardCanvas",
    nameList: [],
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
    drawCard: [],//保存拖拽的牌
    choseArrTemp:[], //改变拖拽牌的index 
    
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
    arr[eindex].tag = 0;
    this.data.choseArr.splice(delindex,1);
    for (const item of this.data.choseArr) {
      let nindex = this.data.choseArr.findIndex((value) => {
        return value == item;
      });
      arr[item].tag = nindex + 1;
    }
    this.setData({
      shufCard: arr
    });
  },

  turnback: function(e){
    let front = e.currentTarget.id
    let back = e.currentTarget.id + "back";
    let eindex = e.currentTarget.dataset.index;
    let arr = this.data.drawCard;
    arr[eindex].drawPoke = {
      // front: `z-index:1;`,
      // back: `z-index:2;`
      front: `height:0;opacity:0;`,
      back: ``
    }
    this.setData({
      drawCard: arr
    });
  },

  onDragStart:function(e){
    let choseArr = this.data.choseArr;
    choseArr.unshift(e.currentTarget.dataset.num);
    let choseTemp = Array.from(new Set(choseArr));
    this.setData({
      choseArrTemp: choseTemp,
      choseArr: choseTemp
    });
  },

  onDrag: function(e){
    console.log(e)
    let eindex = e.currentTarget.id.split("_")[1];
    let arr = this.data.drawCard;
    let choseArr = this.data.choseArr;
    let choseArrTemp = this.data.choseArrTemp;
    // choseArr.unshift(e.currentTarget.dataset.num);
    // let choseTemp = Array.from(new Set(choseArr.unshift(e.currentTarget.dataset.num)));
    let choseTempLen = choseArrTemp.length;
    console.log(choseArr, choseArrTemp)
    arr[eindex].x = e.detail.x;
    arr[eindex].y = e.detail.y;
    for (const item of arr) {
      let indext = choseArrTemp.findIndex( val => {
        return val == item.num
      });
      console.log(item.num, indext)
      item.zindex = choseTempLen - indext;
      // if (item.zindex == len + 1){
      //   item.zindex = len - eindex;
      // }
      //(item.zindex == len + 1) ? eindex : item.zindex;
    }

    //arr[eindex].zindex = len + 1;
    console.log(arr)
    this.setData({
      drawCard: arr
    });
  },

  //洗牌
  shuffle: function() {
    this.setData({
      shufCard: randomCard(this.data.nameList, this.data.cardType),
      panelKey: "shuffleCardCanvas",
      isShuffle: true,
      choseArr: []
    });
    shuffleCard(this.data.cardType);
  },
  deal: function() {
    if (!this.data.isShuffle) {
      return;
    }
    this.setData({
      panelKey: "shufPanel"
    });
  },
  confirm: function () {
    let arr = [];
    let len = this.data.choseArr.length;
    for (const item of this.data.choseArr){
      this.data.shufCard[item].num = item;
      this.data.shufCard[item].zindex = len;
      arr.push(this.data.shufCard[item]);
      len--;
    }
    console.log(arr)
    this.setData({
      panelKey: "drawPanel",
      drawCard: arr
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
      "position": Math.round(Math.random() * 10) % 2,
      "drawPoke": {
        front: '', back: ''
      },
      x:0,
      y: 0
    })
  };
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

