//var Promise = require('../../plugins/es6-promise.js')
var app = getApp();
const ctx = wx.createCanvasContext('img');
var clientHeight = app.globalData.clientHeight - 150;
var clientWidth = app.globalData.clientWidth - 4;
Page({
  data: {
    clientWidth: '',
    clientHeight: '',
    top: '',
    left: '',
    imgList: [],
    isChecked: '',
    prurl: ''
  },
  onLoad: function() {
    this.setData({
      clientHeight: app.globalData.clientHeight - 150,
      clientWidth: app.globalData.clientWidth - 4
    });
  },
  drag: function(e) {
    this.setData({
      left: e.touches[0].clientX - 45,
      top: e.touches[0].clientY - 75,
      isChecked: e.currentTarget.id
    })
  },
  share: function() {
    //var that = this;
    getImg().then(data => {
      drawImg(data);
    }).then(() => {
      this.createImg();
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
  createImg: function(){
    var that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.data.clientWidtht,
      height: that.data.clientHeight,
      destWidth: that.data.clientWidtht,
      destHeight: that.data.clientHeight,
      canvasId: 'img',
      success: function (res) {
        console.log(res.tempFilePath);
        that.setData({
          prurl: res.tempFilePath
        })
      },
      fail: function (res) {
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
    ctx.clearRect(0, 0, clientWidth, clientHeight);
    ctx.draw();
    // data.forEach(function(item) {
    //   var imgUrl = '../../image/waiteTarot/' + item.id + '.jpg';
    //   ctx.drawImage(imgUrl, item.left, item.top, item.width, item.height);
    //   ctx.drawImage('../../image/waiteTarot/78.jpg', item.left + 20, item.top + 20, item.width, item.height);
    // });
    ctx.drawImage('../../image/waiteTarot/78.jpg', 20,20, 150, 150);
    ctx.draw(true);
    resolve();
  })
}