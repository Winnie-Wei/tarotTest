// component/cardblock/cardblock.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //cardItem: { type: Object }
    cardBlock: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    clientWidth: app.globalData.clientWidth
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapBack: function(e) {
      if (e.target.dataset.dragkey == 1) {
        var cardBlockTemp = this.data.cardBlock;
        cardBlockTemp.splice(e.target.dataset.index, 1);
        this.triggerEvent('updateEvent', {
          "arr": cardBlockTemp,
          "id": e.target.id
        });
      }
    },
    drag: function(e) {
      console.log(e);
      for (var i = 0; i < this.data.cardBlock.length; i++) {
        if (e.target.id.indexOf(this.data.cardBlock[i].id) !== -1) {
          var mleft = 'cardBlock[' + i + '].left';
          var mtop = 'cardBlock[' + i + '].top';
          var mposition = 'cardBlock[' + i + '].position';
          var mdragKey = 'cardBlock[' + i + '].dragkey';
          this.setData({
            [mleft]: e.touches[0].clientX - 30,
            [mtop]: e.touches[0].clientY - 50,
            [mposition]: 'fixed',
            [mdragKey]: 0,
          });
          break;
        }
      }
    }
  }
})