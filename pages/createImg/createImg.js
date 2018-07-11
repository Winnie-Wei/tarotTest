var app = getApp();
Page({
  data: {
    prurl: '',
    hidden: true,
    clientHeight: '',
    clientWidth: ''
  },
  onLoad: function() {
    this.setData({
      clientHeight: app.globalData.clientHeight - 50,
      clientWidth: app.globalData.clientWidth - 2
    });
    this.init();
  },
  init: function() {
    this.shuffle(); //洗牌
  },
  shuffle: function() {
    const ctx = wx.createCanvasContext('shuffle');

    for (var i = 0; i < 78; i++) {
      var x = 0,
        y = 0,
        deg = 0,
        rx = 0,
        ry = 0;
      if (this.data.clientWidth < 350) {
        x = Math.random() * 160 + 50;
        y = Math.random() * 160 + 15;
        deg = Math.random() * Math.PI;
        rx = x + 50;
        ry = y + 46;
        ctx.translate(rx, ry);
        ctx.rotate(deg);
        ctx.drawImage('../../image/waiteTarot/78.jpg', 0, 0, 35, 62);
        ctx.rotate(-deg);
        ctx.translate(-rx, -ry);
      } else {
        x = Math.random() * 190 + 50;
        y = Math.random() * 200 + 20;
        deg = Math.random() * Math.PI;
        rx = x + 50;
        ry = y + 46;
        ctx.translate(rx, ry);
        ctx.rotate(deg);
        ctx.drawImage('../../image/waiteTarot/78.jpg', 25, -46, 45, 80);
        ctx.rotate(-deg);
        ctx.translate(-rx, -ry);
      }
    }
    ctx.draw()
  },
  alert: function() {
    console.log('123434')
  }
})