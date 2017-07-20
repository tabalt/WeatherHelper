// setting.js
var api = require('../../libs/api')

//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    citySelected: {},
    weatherData: {},
    multiConf: [],
    multiSelected: [0, 0, 0],
    chinaCityConf:[],
    chinaCitySelected: [0, 0, 0],
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      chinaCitySelected: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var level = this.cityLevelConf[e.detail.column + 1]
    var code = this.data.chinaCityConf[e.detail.column][e.detail.value][1]
    api.loadCityConf(level, code, this.updateChinaCityConfByLevel);
    if (e.detail.column == 0) {
      level = this.cityLevelConf[e.detail.column + 2]
      code = this.data.chinaCityConf[e.detail.column+1][0][1]
      api.loadCityConf(level, code, this.updateChinaCityConfByLevel);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      weatherData: wx.getStorageSync('weatherData'),
      citySelected: wx.getStorageSync('citySelected'),
    })

    this.updateChinaCityConf();
  },
  updateChinaCityConf: function() {
    api.loadCityConf('province', '', this.updateChinaCityConfByLevel);
    api.loadCityConf('city', '01', this.updateChinaCityConfByLevel);
    api.loadCityConf('town', '0101', this.updateChinaCityConfByLevel);
  },
  updateChinaCityConfByLevel: function (level, code, conf) {
    var that = this;
    var chinaCityConf = this.data.chinaCityConf
    chinaCityConf[this.getCityLevelIndex(level)] = conf
    that.setData({ chinaCityConf: chinaCityConf });
  },
  cityLevelConf: [
    "province",
    "city",
    "town"
  ],
  getCityLevelIndex: function(level) {
    for (var k in this.cityLevelConf) {
      if (level == this.cityLevelConf[k]) {
        return k;
        break;
      }
    }
    return 0;
  },

  removeCity: function (e) {
    try {
      var cityCode = e.currentTarget.dataset.city_code || '';
      if (cityCode == "") {
        return 
      }
      var citySelected = wx.getStorageSync('citySelected')
      for (var k in citySelected) {
        if(citySelected[k] == cityCode) {
          citySelected.splice(k, 1)
          break;
        }
      }
      wx.setStorageSync('citySelected', citySelected);
      this.setData({
        citySelected: citySelected,
      })
    } catch (e) { }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})