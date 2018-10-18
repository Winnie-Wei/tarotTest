var tartoMean = require('../../data/means.js');
var app = getApp();
Page({
  data: {
    cardUrl:'',
    clientWidth: '',
    clientHeight: '',
    meanDetail: '', //牌义信息
    meanArr: [], //牌义详情数组
  },
  onLoad: function (options) {
    var mean = [];
    tartoMean.means.forEach(item => {
      if ( "moon" == item.id ){
        mean = item.mean;
      }
    })
    this.setData({  
      clientHeight: app.globalData.clientHeight,
      clientWidth: app.globalData.clientWidth,
      //cardUrl: '../../image/waiteTarot/' + options.id + '.jpg', 
      cardUrl: '../../image/waiteTarot/moon.jpg',
      meanArr: mean
    });
    console.log(this.data.meanDetail)
    // wx.setNavigationBarTitle({
    //   title: this.data.servicedetail.name
    // })
  }
})