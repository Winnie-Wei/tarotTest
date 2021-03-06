var tarotData = require('../../data/tarto-list.js');
var app = getApp()
Page({
  data: {
    currentTab: 0,
    divinationNote: [],
    clientHeight: ''
  },
  onLoad: function (options) {
    this.setData({
      divinationNote: tarotData.noteItem,
      clientHeight: app.globalData.clientHeight - 50
    })
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})