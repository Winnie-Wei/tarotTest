//var Promise = require('../../plugins/es6-promise.js')
var tarotList = require('../../data/tarto-list.js');
var app = getApp();
const ctx = wx.createCanvasContext('img');
var clientHeight = app.globalData.clientHeight - 150;
var clientWidth = app.globalData.clientWidth - 4;
var card = [];
Page({
  data: {
    clientWidth: '',
    clientHeight: '',
    top: '',
    left: '',
    imgList: [],
    isChecked: '',
    prurl: '',
    cardArr: []
  },
  onLoad: function() {
    this.setData({
      clientHeight: app.globalData.clientHeight - 150,
      clientWidth: app.globalData.clientWidth - 4,
      imgList: tarotList.imgList
    });
  },
  drag: function(e) {
    var that = this;
    var imgleft = e.touches[0].clientX - 45;
    var imgtop = e.touches[0].clientY - 75;
    for (var i = 0; i < this.data.imgList.length; i++) {
      if (this.data.imgList[i].id == e.currentTarget.id) {
        var mleft = 'imgList['+ i + '].left';
        var mtop = 'imgList[' + i + '].top';
        var imgUrl = this.data.imgList[i].src;
        this.setData({
          [mleft]: e.touches[0].clientX - 45,
          [mtop]: e.touches[0].clientY - 75,
        });
        //ctx.drawImage(imgUrl, imgleft, imgtop, 90, 150);
        break;
      }
    }
    //ctx.draw();
    
    //console.log(e)
    var card = extendObj(e.currentTarget, e.touches[0]);
    this.data.cardArr.push(card);
    var hash = {};
    this.data.cardArr = this.data.cardArr.reduce(function(item, next) { //去除重复项
      hash[next.id] ? '' : hash[next.id] = true && item.push(next);
      return item
    }, []);
    console.log(this.data.cardArr)
    card = this.data.cardArr;

    
  },
  share: function() {
    var that = this;
    getImg().then(data => {
      drawImg(card);
    }).then(() => {
      this.createImg();
    })
    //this.createImg();
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
  createImg: function() {
    var that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.data.clientWidtht,
      height: that.data.clientHeight,
      destWidth: that.data.clientWidtht,
      destHeight: that.data.clientHeight,
      canvasId: 'img',
      success: function(res) {
        console.log(res.tempFilePath);
        that.setData({
          prurl: res.tempFilePath
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
  }
});

function getImg(that) {
  var imgList = [];
  return new Promise((resolve, reject) => {
    wx.createSelectorQuery().selectAll('.imgcss.t').boundingClientRect(function(rect) {
      rect.forEach(function(rect) {
        imgList.push(rect);
      });
      resolve(imgList);
    }).exec();
  })
}

function drawImg(data) {
  return new Promise((resolve, reject) => {
    // data.forEach(function (item) {
    //   var mleft = item.clientX - 45;
    //   var mtop = item.clientY - 75;
    //   var imgUrl = '../../image/waiteTarot/' + item.id + '.jpg';
    //   ctx.drawImage(imgUrl, mleft, mtop, 90, 150);
    // });
    for(var i=0; i<data.length; i++){
      var mleft = data[i].clientX - 45;
      var mtop = data[i].clientY - 75;
      var imgUrl = '../../image/waiteTarot/' + data[i].id + '.jpg';
      ctx.drawImage(imgUrl, mleft, mtop, 90, 150);
    }
    ctx.draw();
    // ctx.clearRect(0, 0, clientWidth, clientHeight);
    // ctx.draw();
    // // data.forEach(function(item) {
    // //   var imgUrl = '../../image/waiteTarot/' + item.id + '.jpg';
    // //   ctx.drawImage(imgUrl, item.left, item.top, item.width, item.height);
    // //   ctx.drawImage('../../image/waiteTarot/78.jpg', item.left + 20, item.top + 20, item.width, item.height);
    // // });
    // ctx.drawImage('../../image/waiteTarot/78.jpg', 20, 20, 150, 150);
    // ctx.draw(true);
    resolve();
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