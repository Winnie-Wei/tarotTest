//var Promise = require('../../plugins/es6-promise.js')
var app = getApp();
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
    const ctx = wx.createCanvasContext('poker');
    ctx.drawImage('../../image/waiteTarot/78.jpg', 200, 0, 90, 150);
    this.setData({
      clientHeight: app.globalData.clientHeight - 150,
      clientWidth: app.globalData.clientWidth - 4
    });
  },
  drag: function(e) {
    console.log(e)

    this.setData({
      left: e.touches[0].clientX - 45,
      top: e.touches[0].clientY - 75,
      isChecked: e.currentTarget.id
    })
  },
  share: function() {
    var that = this;
    const ctx = wx.createCanvasContext('poker');
    ctx.drawImage('../../image/waiteTarot/78.jpg', 200, 0, 90, 150);
    getImg().then(function(data) {
      // console.log(data)
      // data.forEach(function(item) {
      //   var imgUrl = '../../image/waiteTarot/' + item.id + '.jpg'
      //   ctx.drawImage(imgUrl, item.left, item.top, item.width, item.height);
      // });
      ctx.drawImage('../../image/waiteTarot/78.jpg', 200, 0, 90, 150);

    //   wx.canvasToTempFilePath({
    //     x: 0,
    //     y: 0,
    //     width: that.data.clientWidtht,
    //     height: that.data.clientHeight,
    //     destWidth: that.data.clientWidtht,
    //     destHeight: that.data.clientHeight,
    //     canvasId: 'img',
    //     success: function(res) {
    //       console.log(res.tempFilePath);
    //       that.setData({
    //         prurl: res.tempFilePath
    //       })
    //     },
    //     fail: function(res) {
    //       console.log(res)
    //     }
    //   })
    })
  },
  save: function() {
    var that = this
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
              /* 该隐藏的隐藏 */
              that.setData({
                hidden: true
              })
            }
          }
        })
      }
    })
  }
});

function getImg() {
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