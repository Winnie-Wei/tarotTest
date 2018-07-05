Page({
  data: {
    x: 0,
    y: 0,
    hidden: true
  },
  onLoad: function() {
    const ctx = wx.createCanvasContext('myCanvas2')

    // Create linear gradient
    const grd = ctx.createLinearGradient(0, 0, 200, 0)
    grd.addColorStop(0.05, 'red')
    grd.addColorStop(1, 'white')

    // Fill with gradient
    ctx.setFillStyle(grd)
    ctx.fillRect(30, 10, 150, 180)
    ctx.draw()

    const ctx3 = wx.createCanvasContext('myCanvas3')
    ctx3.beginPath()
    ctx3.setLineWidth(10)
    ctx3.setLineJoin('miter')
    ctx3.setMiterLimit(1)
    ctx3.moveTo(10, 10)
    ctx3.lineTo(100, 50)
    ctx3.lineTo(10, 90)
    ctx3.stroke()
    ctx3.draw()
  },
  start: function(e) {
    this.setData({
      hidden: false,
      x: e.touches[0].x,
      y: e.touches[0].y
    })
  },
  move: function(e) {
    this.setData({
      x: e.touches[0].x,
      y: e.touches[0].y
    })
  },
  end: function(e) {
    this.setData({
      hidden: true
    })
  }
})