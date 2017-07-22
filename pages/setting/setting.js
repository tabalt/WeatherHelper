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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      weatherData: wx.getStorageSync('weatherData'),
      citySelected: wx.getStorageSync('citySelected'),
    })

    this.initChinaCityConf();
  },

  initChinaCityConf: function () {
    var initCityConf = [
      ["province", ""],
      ["city", "01"],
      ["town", "0101"]
    ];
    for (var idx in initCityConf) {
      var level = initCityConf[idx][0]
      var code = initCityConf[idx][1]
      api.loadCityConf(level, code, this.updateChinaCityConfByLevel);
    }
  },
  updateChinaCityConfByLevel: function (level, code, conf) {
    var chinaCityConf = this.data.chinaCityConf
    chinaCityConf[this.getCityLevelIndex(level)] = conf
    this.setData({ chinaCityConf: chinaCityConf });
  },
  cityLevelConf: ["province", "city", "town"],
  getCityLevelIndex: function(level) {
    for (var k in this.cityLevelConf) {
      if (level == this.cityLevelConf[k]) {
        return k;
        break;
      }
    }
    return 0;
  },
  pickerCity: function (e) {
    try {
      var level = this.cityLevelConf[e.detail.column + 1];
      var code = this.data.chinaCityConf[e.detail.column][e.detail.value][1];
      var that = this
      api.loadCityConf(level, code, function (level, code, conf) {
        that.updateChinaCityConfByLevel(level, code, conf);
        if (e.detail.column == 0) {
          level = that.cityLevelConf[e.detail.column + 2]
          code = that.data.chinaCityConf[e.detail.column + 1][0][1]
          api.loadCityConf(level, code, that.updateChinaCityConfByLevel);
        }
      });
    } catch (e) { console.log(e) }
  },
  addCity: function (e) {
    try {
      var cityCode = this.data.chinaCityConf[2][e.detail.value[2]][1]
      var citySelected = wx.getStorageSync('citySelected') || []

      if (this.data.weatherData['__location__'].realtime.city_code == cityCode) {
        return
      }
      if (citySelected.find(function (item) { return item === cityCode; }) != undefined) {
        return
      }

      var that = this;
      api.loadWeatherData(cityCode, function (cityCode, data) {
        var weatherData = wx.getStorageSync('weatherData') || {};
        weatherData[cityCode] = data;
        wx.setStorageSync('weatherData', weatherData);

        citySelected.push(cityCode);
        wx.setStorageSync('citySelected', citySelected);
        that.setData({
          chinaCitySelected: e.detail.value,
          citySelected: citySelected,
          weatherData: weatherData
        })
      });
    } catch (e) { console.log(e) }
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