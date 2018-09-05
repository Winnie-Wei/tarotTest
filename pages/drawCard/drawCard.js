var tarotList = require('../../data/tarotName.js');
var app = getApp();
const ctx = wx.createCanvasContext('img');
const ctxs = wx.createCanvasContext('shuffle');
Page({
  data: {
    clientWidth: '',
    clientHeight: '',
    top: '',
    left: '',
    imgList: [],
    prurl: '',
    cardArr: [],
    cardlist: [],
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
    cardType: '',
    cardblock: [] //生成可以拖拽的卡片
  },
  onLoad: function(options) {
    console.log(options)
    this.setData({
      clientHeight: app.globalData.clientHeight,
      clientWidth: app.globalData.clientWidth,
      nameList: tarotList.nameList.slice(this.data.numArray[0].s, this.data.numArray[0].e),
      cardType: this.data.typeArray[0]
    });
  },
  drag: function(e) {
    if (e.currentTarget.dataset.dragkey == 0) {
      return;
    }
    var that = this;
    for (var i = 0; i < this.data.imgList.length; i++) {
      if (e.target.id.indexOf(this.data.imgList[i].id) !== -1) {
        var mleft = 'imgList[' + i + '].left';
        var mtop = 'imgList[' + i + '].top';
        var mposition = 'imgList[' + i + '].position';
        var mdragkey = 'imgList[' + i + '].dragkey';
        this.setData({
          [mleft]: e.touches[0].clientX - 30,
          [mtop]: e.touches[0].clientY - 50,
          [mposition]: 'fixed',
          [mdragkey]: 2
        });
        break;
      }
    }

    var card = extendObj(e.target, e.touches[0]);
    this.data.cardArr.push(card);
    this.data.cardArr.reverse();
    var hash = {};
    this.data.cardArr = this.data.cardArr.reduce(function(item, next) { //去除重复项
      hash[next.id] ? '' : hash[next.id] = true && item.push(next);
      return item
    }, []);
    console.log(this.data.cardArr);
    this.setData({
      cardlist: this.data.cardArr,
      scrollkey: false
    })
  },
  dragEnd: function() {
    this.setData({
      scrollkey: true
    })
  },
  share: function(card) {
    var that = this;
    getImg().then(data => {
      this.drawImg(this.data);
    }).then(() => {
      var length = this.data.cardlist.length;
      for (var i = 0, j = 0; i < length; i++, j++) {
        var sid = this.data.cardlist[j].id;
        if (sid.indexOf("back") !== -1) {
          this.data.cardlist.splice(j, 1);
          j--;
        }
      }
    });

  },
  save: function() {
    var that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.prurl,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定');
            }
          }
        })
      }
    })
  },
  drawImg: function(data) {
    var that = this;
    return new Promise((resolve, reject) => {
      var width = this.data.clientWidth;
      var height = this.data.clientHeight + 82;
      ctx.drawImage("../../image/pic/bg.jpg", 0, 0, width, height);
      for (var i = 0; i < data.cardlist.length; i++) {
        var mleft = data.cardlist[i].clientX - 30;
        var mtop = data.cardlist[i].clientY - 50;
        var mid = data.cardlist[i].id;
        if (mid.indexOf("back") !== -1) { //背面
          mid = mid.substring(0, mid.length - 4);
        }
        var imgUrl = '../../image/' + this.data.cardType + '/' + mid + '.jpg';
        ctx.drawImage(imgUrl, mleft, mtop, 60, 100);
      }
      ctx.draw(false, setTimeout(function() {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: that.data.clientWidtht,
          height: that.data.clientHeight + 82,
          destWidth: that.data.clientWidtht,
          destHeight: that.data.clientHeight,
          canvasId: 'img',
          success: function(res) {
            ctx.drawImage("../../image/pic/bg.jpg", 0, 0, width, height);
            ctx.draw();
            console.log(res.tempFilePath);
            that.setData({
              prurl: res.tempFilePath
            });
          },
          fail: function(res) {
            console.log(res)
          }
        })
      }, 500));
      resolve();
    })
  },
  resetScroll: function(){
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
    this.getLeftVal(e.currentTarget.id).then(data => {
      console.log(data)
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
            [show]: false,
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
   this.resetScroll();
  },
  getLeftVal: function(id) {
    return new Promise((resolve, reject) => {
      var idTemp = "#" + id,
        poTemp = {};
      wx.createSelectorQuery().select(idTemp).boundingClientRect(function(rect) {
        poTemp.left = rect.left;
        poTemp.top = rect.top;
        resolve(poTemp);
      }).exec()
    });
  },
  creatNewCard: function(e, opTemp) {
    if (e.currentTarget.dataset.dragkey == 0) {
      var cardblockTemp = this.data.cardblock;
      console.log(cardblockTemp)
      for (var i = 0; i < this.data.imgList.length; i++) {
        var left = 'imgList[' + i + '].left';
        var top = 'imgList[' + i + '].top';
        var dragkey = 'imgList[' + i + '].dragkey';
        var show = 'imgList[' + i + '].show';
        if (this.data.imgList[i].dragkey == 2){
          for (var j = 0; j < cardblockTemp.length;j++){
            if (cardblockTemp[j].id == this.data.imgList[i].id ){
              this.getLeftVal(cardblockTemp[j].id).then(async data => {
                var op = await data
                cardblockTemp[j].left = data[0].left;
                cardblockTemp[j].top = data[0].top;
                console.log(op)
              })
              // this.getLeftVal(cardblockTemp[j].id ).then(data => {
                
              // })
            }
          }
        }
        else if (e.target.id.indexOf(this.data.imgList[i].id) !== -1) { //选中的牌突出
          this.setData({
            [left]: opTemp.left % this.data.clientWidth,
            [show]: true,
            scrollkey: false,
            [top]: this.data.clientHeight - 180,
            [dragkey]: 1
          });
          cardblockTemp.push(this.data.imgList[i]);
          break;
        }
      }
      var hash = {};
      cardblockTemp = cardblockTemp.reduce(function(item, next) { //去除重复项
        hash[next.id] ? '' : hash[next.id] = true && item.push(next);
        return item
      }, []);
      console.log(cardblockTemp)
      this.setData({
        cardblock: cardblockTemp
      });
    }
  },
  turnback: function(e) {
    console.log(e)
    this.getLeftVal(e.currentTarget.id).then(data => {
      this.creatNewCard(e, data);
    })
    
  },
  updateCardList: function(e) {
    var imgListTemp = this.data.imgList;
    for (var i = 0; i < imgListTemp.length; i++) {
      if (imgListTemp[i].id + "back" == e.detail.id) {
        imgListTemp[i].show = false;
        imgListTemp[i].dragkey = 0;
        imgListTemp[i].left = i * 62;
      }
    }
    this.setData({
      cardblock: e.detail.arr,
      imgList: imgListTemp,
      scrollkey: (e.detail.arr.length == 0) ? true : false
    })
  },
  shuffle: function() {
    this.setData({
      imgList: randomCard(this.data.nameList, this.data.cardType),
      drawPanel: true,
      shuffleCardCanvas: false,
      isShuffle: true,
      cardblock:[],
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
      ctxs.drawImage('../../image/' + cardtype + '/78.jpg', 0, 0, 35, 62);
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
      ctxs.drawImage('../../image/' + cardtype + '/78.jpg', 25, -46, 45, 80);
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
      "id": larr[k],
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
      "show": false
    })
  };
  return arrtemp;
}