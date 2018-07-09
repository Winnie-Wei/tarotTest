let promise1 = new Promise(function(resolve, reject) {

  /* 获得要在画布上绘制的图片 */
  wx.getImageInfo({
    src: '../../image/waiteTarot/queen.jpg',
    success: function(res) {
      console.log(res)
      resolve(res);
    }
  })
});
let promise2 = new Promise(function(resolve, reject) {
  wx.getImageInfo({
    src: '../../image/waiteTarot/queen.jpg',
    success: function(res) {
      console.log(res)
      resolve(res);
    }
  })
});



Page({
  data: {
    prurl: '',
    hidden: true
  },
  onLoad: function() {
    /* 图片获取成功才执行后续代码 */
    Promise.all(
      [promise1, promise2]
    ).then(res => {
      console.log(res)

      /* 创建 canvas 画布 */
      const ctx = wx.createCanvasContext('shareImg')

      /* 绘制图像到画布  图片的位置你自己计算好就行 参数的含义看文档 */
      /* ps: 网络图片的话 就不用加../../路径了 反正我这里路径得加 */
      ctx.drawImage('../../' + res[0].path, 0, 0)
      //ctx.drawImage('../../' + res[1].path, 0, 0, 545, 771)

      /* 绘制文字 位置自己计算 参数自己看文档 */
      ctx.setTextAlign('center') //  位置
      ctx.setFillStyle('#000') //  颜色
      ctx.setFontSize(22) //  字号
      ctx.fillText('描述1', 545 / 2, 130) //  内容  不会自己换行 需手动换行
      ctx.fillText('描述2', 545 / 2, 160) //  内容

      /* 绘制 */
      ctx.stroke()
      ctx.draw()
    })
  },
  share: function() {
    var that = this
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 545,
      height: 771,
      destWidth: 545,
      destHeight: 771,
      canvasId: 'shareImg',
      success: function(res) {
        console.log(res.tempFilePath);
        /* 这里 就可以显示之前写的 预览区域了 把生成的图片url给image的src */
        that.setData({
          prurl: res.tempFilePath,
          hidden: false
        })
        // wx.navigateTo({
        //   url: '../../pages/cardDetail/cardDetail?id=queen'
        // })
      },
      fail: function(res) {
        console.log(res)
      }
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

})