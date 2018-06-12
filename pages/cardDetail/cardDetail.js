Page({
  data: {
    cardUrl:''
  },
  onLoad: function (options) {
    this.setData({  
      cardUrl: '../../image/waiteTarot/' + options.id + '.jpg', 
    });
    // wx.setNavigationBarTitle({
    //   title: this.data.servicedetail.name
    // })
  }
})