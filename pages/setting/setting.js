// setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotCityConf: [
      {
        code: "",
        name: "北京"
      },{
        code: "",
        name: "上海"
      }, {
        code: "",
        name: "广州"
      }, {
        code: "",
        name: "深圳"
      }, {
        code: "",
        name: "成都"
      }, {
        code: "",
        name: "杭州"
      }, {
        code: "",
        name: "南京"
      }, {
        code: "",
        name: "天津"
      }, {
        code: "",
        name: "武汉"
      }, {
        code: "",
        name: "重庆"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync('cityList', ["__location__","101010200", "101030100"]);
  },

  searchCity: function(value) {
    console.log(value)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})