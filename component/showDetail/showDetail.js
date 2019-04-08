// component/showDetail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgSrc: {
      type: String,
      value: ''
    },
    cardName: {
      type:String,
      value: '权杖皇后'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showMod: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show(){
      this.setData({
        showMod:true
      })
    }
  }
})
