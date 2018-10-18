var tarotList = require('../../data/tarotName.js');
var app = getApp();
const ctx = wx.createCanvasContext('img');
const ctxs = wx.createCanvasContext('shuffle');
Page({
  data: {
    clientWidth: '',
    clientHeight: '',
    scrollWidth: '', //scroll-view的宽
    top: '',
    left: '',
    imgList: [],
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
    cardblock: [], //生成可以拖拽的卡片
    lastTapTime: ''
  },
  onLoad: function(options) {
    console.log(options)
    this.setData({
      clientHeight: app.globalData.clientHeight,
      clientWidth: app.globalData.clientWidth,
      nameList: tarotList.nameList.slice(this.data.numArray[options.num].s, this.data.numArray[options.num].e),
      cardType: this.data.typeArray[options.type],
      scrollWidth: this.data.numArray[0].e * 62 
    });
  },
  resetScroll: function() {
    this.setData({
      scrollkey: true
    });

    for (var i = 0; i < this.data.cardblock.length; i++) {
      if (this.data.cardblock[i].dragkey == 1) {
        this.setData({
          scrollkey: false
        })
      }
    }
  },
  dragMoveView: function(e) { //拖拽movable-view
    if (e.target.dataset.dragkey == 1) {
      var idMove = e.target.id.substring(0, e.target.id.length - 4);
      for (var i = 0; i < this.data.imgList.length; i++) {
        if (this.data.cardblock[i].id == idMove) {
          var dragkeyC = 'cardblock[' + i + '].dragkey';
          this.setData({
            [dragkeyC]: 2
          });
        }
        break;
      }
      for (var i = 0; i < this.data.imgList.length; i++) {
        if (this.data.imgList[i].id == idMove) {
          var dragkeyI = 'imgList[' + i + '].dragkey';
          this.setData({
            [dragkeyI]: 2
          });
        }
        //break;
      }
    }
    this.resetScroll();
  },
  dragMoveEnd: function(e) {
    console.log(e)
    var cardblockTemp = this.data.cardblock;
    this.getLeftVal(e.currentTarget.id).then(data => {
      var citem = cardblockTemp.filter(function(item) {
        if (item.shownum) {
          return item.id == e.currentTarget.id;
        } else {
          return item.id + "back" == e.currentTarget.id;
        }
      })
      if (citem.length == 0) return;
      citem[0].left = data.left;
      citem[0].top = data.top;
      cardblockTemp.push(citem[0])
      cardblockTemp = delRepeat(cardblockTemp); //去除重复
      this.setData({
        cardblock: cardblockTemp
      });
      console.log(this.data.cardblock)
    })
  },
  tapBack: function(e) { //点击movable-view
    console.log(e)
    if (e.target.dataset.dragkey == 1) {
      var cardblockTemp = this.data.cardblock;
      for (var i = 0; i < cardblockTemp.length; i++) {
        var idTap = e.target.id.substring(0, e.target.id.length - 4);
        if (cardblockTemp[i].id == idTap) {
          cardblockTemp.splice(i, 1);
          break;
        }
      }
      for (var i = 0; i < this.data.imgList.length; i++) {
        var show = 'imgList[' + i + '].show';
        var dragkey = 'imgList[' + i + '].dragkey';
        var left = 'imgList[' + i + '].left';
        if (e.target.id.indexOf(this.data.imgList[i].id) !== -1) { //选中的牌
          this.setData({
            [show]: 1,
            [dragkey]: 0,
            [left]: i * 62
          });
          break;
        }
      }
      this.setData({
        cardblock: cardblockTemp
      })
    }
    else if ( e.target.dataset.dragkey == 2 ){
      for (var i = 0; i < this.data.cardblock.length; i++) {
        if (e.target.id.indexOf(this.data.cardblock[i].id) !== -1) {
          var transF = 'cardblock[' + i + '].transF';
          var transB = 'cardblock[' + i + '].transB';
          var shownum = 'cardblock[' + i + '].shownum';
          this.setData({
            [transF]: "rotateY(180deg)",
            [transB]: "rotateY(0deg)",
            [shownum]: "true",
          });
          break;
        }
      }
    }
    this.resetScroll();
  },
  getLeftVal: function(id) {
    return new Promise((resolve, reject) => {
      var idTemp = "#" + id,
        poTemp = {};
      wx.createSelectorQuery().select(idTemp).boundingClientRect(function(rect) {
        poTemp.left = rect.left;
        poTemp.top = rect.top;
        console.log(idTemp,poTemp)
        resolve(poTemp);
      }).exec()
    });
  },
  creatNewCard: function(e, opTemp) {
    return new Promise((resolve, reject) => {
      if (e.currentTarget.dataset.dragkey == 0) {
        var cardblockTemp = this.data.cardblock;
        console.log(e, cardblockTemp)
        for (var i = 0; i < this.data.imgList.length; i++) {
          var left = 'imgList[' + i + '].left';
          var top = 'imgList[' + i + '].top';
          var dragkey = 'imgList[' + i + '].dragkey';
          var show = 'imgList[' + i + '].show';
          var id = 'imgList[' + i + '].id';
          if (this.data.imgList[i].dragkey == 2) {
            for (var j = 0; j < cardblockTemp.length; j++) {
              if (cardblockTemp[j].id == this.data.imgList[i].id) {
                cardblockTemp[j] = cardblockTemp[j]
              }
            }
          } else if (e.target.id.indexOf(this.data.imgList[i].id) !== -1) { //选中的牌突出
            this.setData({
              [left]: opTemp.left,
              [show]: 0,
              scrollkey: false,
              [top]: this.data.clientHeight - 150,
              [dragkey]: 1,
              [id]: this.data.imgList[i].id.substring(0,this.data.imgList[i].id.length-6)
            });
            //var itemTemp = this.data.imgList[i];
            //itemTemp.left = opTemp.left;
            cardblockTemp.push(this.data.imgList[i]);
            //break;
          }
        }
        resolve(cardblockTemp)
      }
    })
  },
  makecardblockTemp: function(e, opTemp) {
    this.creatNewCard(e, opTemp).then(cardblockTemp => {
      cardblockTemp = delRepeat(cardblockTemp); //去除重复
      console.log(cardblockTemp)
      this.setData({
        cardblock: cardblockTemp
      });
    })
    console.log(this.data.imgList)
  },
  turnback: function(e) {
    console.log(e)
    this.getLeftVal(e.currentTarget.id).then(data => {
      this.makecardblockTemp(e, data);
    })
  },
  shuffle: function() {
    this.setData({
      imgList: randomCard(this.data.nameList, this.data.cardType),
      drawPanel: true,
      shuffleCardCanvas: false,
      isShuffle: true,
      cardblock: [],
    });
    shuffleCard(this.data.cardType);
    this.resetScroll();
  },
  deal: function() {
    if (!this.data.isShuffle) {
      return;
    }
    this.setData({
      shuffleCardCanvas: true,
      drawPanel: false,
      scrollLeft: 0
    });
  }
});

function getImg(that) {
  var imgLists = [];
  return new Promise((resolve, reject) => {
    wx.createSelectorQuery().selectAll('.imgcss.t').boundingClientRect(function(rect) {
      rect.forEach(function(rect) {
        imgLists.push(rect);
      });
      resolve(imgLists);
    }).exec();
  })
}

function cloneObj(oldObj) { //复制对象方法
  if (typeof(oldObj) != 'object') return oldObj;
  if (oldObj == null) return oldObj;
  var newObj = new Object();
  for (var i in oldObj)
    newObj[i] = cloneObj(oldObj[i]);
  return newObj;
};

function delRepeat(arr) {
  var hash = {};
  arr = arr.reduce(function(item, next) { //去除重复项
    hash[next.id] ? '' : hash[next.id] = true && item.push(next);
    return item
  }, []);

  return arr;
};

function extendObj() { //扩展对象
  var args = arguments;
  if (args.length < 2) return;
  var temp = cloneObj(args[0]); //调用复制对象方法
  for (var n = 1; n < args.length; n++) {
    for (var i in args[n]) {
      temp[i] = args[n][i];
    }
  }
  return temp;
};

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
      "id": larr[k] + 'scroll',
      "src": imgSrc,
      "left": k * 62,
      "top": app.globalData.clientHeight - 110,
      "zindexF": 2 * k,
      "zindexB": k,
      "transF": "",
      "transB": "rotateY(180deg)",
      "position": "absolute",
      "shownum": false,
      "dragkey": 0,
      "show": 1
    })
  };
  return arrtemp;
}