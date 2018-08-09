var tartoList = require('../../data/tarotName.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tartoLists: [],
    majorArcana: [],
    wands: [],
    cups: [],
    swords: [],
    pentacles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.createList();
  },
  createList: function() {
    var listTemp = [];
    for (var i = 0; i < 78; i++){
      listTemp.push({
        "id": tartoList.nameList[i],
        "name": tartoList.nameList[i]
      })
    }
  console.log(listTemp)
    this.setData({ //获取数据成功后的数据绑定  
      tartoLists: listTemp,
      majorArcana: listTemp.slice(0, 22),
      wands: listTemp.slice(22, 36),
      cups: listTemp.slice(36, 50),
      swords: listTemp.slice(50, 64),
      pentacles: listTemp.slice(64, 77),
    });

  }
})