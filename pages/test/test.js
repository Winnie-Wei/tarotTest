var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data: {
    toView: 'red',
    scrollTop: 100,
    top: '',
    left: ''
  },
  drag: function(e) {
    console.log(e.touches[0].clientX)
    this.setData({
      left:e.touches[0].clientX - 25,
      top:e.touches[0].clientY - 25
    })
  }
})