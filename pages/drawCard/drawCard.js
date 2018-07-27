var tarotList = require('../../data/tarto-list.js');
var app = getApp();
var clientHeight = app.globalData.clientHeight - 150;
var clientWidth = app.globalData.clientWidth - 4;
const ctx = wx.createCanvasContext('img');
var cardlist = [];
Page({
  data: {
    clientWidth: '',
    clientHeight: '',
    top: '',
    left: '',
    imgList: [],
    isChecked: '',
    prurl: '',
    cardArr: [],
    cardlist: []
  },
  onLoad: function() {
    this.setData({
      clientHeight: app.globalData.clientHeight - 150,
      clientWidth: app.globalData.clientWidth,
      imgList: tarotList.imgList
    });
  },
  drag: function(e) {
    console.log(e)
    var that = this;
    var imgleft = e.touches[0].clientX - 45;
    var imgtop = e.touches[0].clientY - 75;
    for (var i = 0; i < this.data.imgList.length; i++) {
     // if (this.data.imgList[i].id == e.target.id) {
      if ( e.target.id.indexOf(this.data.imgList[i].id) !== -1 ) {
        var mleft = 'imgList[' + i + '].left';
        var mtop = 'imgList[' + i + '].top';
        var imgUrl = this.data.imgList[i].src;
        this.setData({
          [mleft]: e.touches[0].clientX - 45,
          [mtop]: e.touches[0].clientY - 75,
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
      cardlist: this.data.cardArr
    })
  },
  share: function(card) {
    var that = this;
    getImg().then(data => {
      this.drawImg(this.data);
    })
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
      var height = this.data.clientHeight
      ctx.drawImage("../../image/pic/bg.jpg", 0, 0, width, height);
      for (var i = 0; i < data.cardlist.length; i++) {
        var mleft = data.cardlist[i].clientX - 45;
        var mtop = data.cardlist[i].clientY - 75;
        var mid = data.cardlist[i].id;
        if (mid.indexOf("back") !== -1){ //图案面
          mid = mid.substring(0,mid.length-4);
        }else{
          var imgUrl = '../../image/waiteTarot/' + mid + '.jpg';
          ctx.drawImage(imgUrl, mleft, mtop, 90, 150);
        } 
      }
      ctx.draw(false, setTimeout(function() {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: that.data.clientWidtht,
          height: that.data.clientHeight,
          destWidth: that.data.clientWidtht,
          destHeight: that.data.clientHeight,
          canvasId: 'img',
          success: function (res) {
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
      },500));
      resolve();
    })
  },
  turnback: function(e) {
    for (var i = 0; i < this.data.imgList.length; i++) {
      if (e.target.id.indexOf(this.data.imgList[i].id) !== -1) {
        var zindexF = 'imgList[' + i + '].zindexF';
        var zindexB = 'imgList[' + i + '].zindexB';
        var transF = 'imgList[' + i + '].transF';
        var transB = 'imgList[' + i + '].transB';
        this.setData({
          [zindexF]: 1,
          [zindexB]: 2,
          [transF]: "rotateY(180deg)",
          [transB]: "rotateY(0deg)"
        });
        break;
      }
    }
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
}