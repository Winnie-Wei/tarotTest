Page({
  data: {
    prurl: '',
    hidden: true
  },
  onLoad: function() {
    this.init();
  },
  init: function(){
    this.shuffle();
  },
  shuffle: function(){
    const ctx = wx.createCanvasContext('shuffle');
    for (var i = 0; i < 1; i++) {
      var x = Math.random() * 270;
      var y = Math.random() * 270;
      var rx = x + 50 / 2;
      var ry = y + 92 / 2;
      console.log(x, y, rx, ry)
      ctx.translate(rx, ry);
      ctx.rotate(20 * Math.PI / 180);
      ctx.drawImage('../../image/waiteTarot/78.jpg', x + 30, y + 30, 50, 92);

    }
    ctx.draw()
  },
  alert: function() {
    console.log('123434')
  }
})