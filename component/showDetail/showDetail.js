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
    },
    cardInfo: {
      type: Object,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showMod: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show(){
      this.setData({
        showMod:true
      })
    },
    close() {
      this.setData({
        showMod: false
      })
    },
  }
})
