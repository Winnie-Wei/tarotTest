Page({
  data: {
    typeArray: ['通用伟特塔罗', '新视角伟特塔罗牌'], 
    object_typeArray: [
      {
        id: 0,
        name: '通用伟特塔罗'
      },
      {
        id: 1,
        name: '新视角伟特塔罗牌'
      }
    ],
    typeIndex: 0,
    numArray:["78张牌","大阿尔卡那","小阿尔卡那"],
    object_numArray: [
      {
        id: 0,
        name: '78张牌'
      },
      {
        id: 1,
        name: '大阿尔卡那'
      },
      {
        id: 2,
        name: '小阿尔卡那'
      }
    ],
    numIndex: 0,
    rotateIndex: '',
    animationData: {}
  },
  // onReady: function () {
  //   // 创建动画
  //   var animation = wx.createAnimation({
  //     duration: 5000,
  //     delay:0,
  //     timingFunction: "linear"
  //   })
  //   this.animation = animation;
  //   // 执行旋转或者点击图片旋转(如果你想要点击就在图片上添加点击事件我默认是添加的)
  //   this.refreshList()
  // },
  // refreshList: function () {
  //   //连续动画需要添加定时器,所传参数每次+1就行
  //   this.timeInterval = setInterval(function () {
  //     //this.data.rotateIndex = this.data.rotateIndex + 1;
  //     this.animation.rotateY(360 * (++this.data.rotateIndex)).step()
  //     this.setData({
  //       animationData: this.animation.export()
  //     })
  //   }.bind(this), 5000)
  // },
  pickType: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },
  pickNum: function (e) {
    this.setData({
      numIndex: e.detail.value
    })
  },
  startDraw: function(){
    // if (this.timeInterval > 0) {
    //   clearInterval(this.timeInterval)
    //   this.timeInterval = 0
    // }

  }
})