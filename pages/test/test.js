var app = getApp();
Page({
  data: {
    clientWidth: '',
    clientHeight: '',
    top: '',
    left: '',
    imgList:[],
    isChecked: ''
  },
  onLoad: function() {
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
      isChecked : e.currentTarget.id
    })
  },
  share: function() {
    var that = this;
    that.data.imgList = [];
    wx.createSelectorQuery().selectAll('.imgcss.t').boundingClientRect(function (rect) {
      rect.forEach(function (rect) {
        that.data.imgList.push(rect);
      })
    }).exec();
    console.log(that.data.imgList)
  },
})