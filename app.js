//app.js
var api = require('./libs/api')
App({
  onLaunch: function() {
    //加载天气数据
    this.loadWeatherData();
    
    // 获取用户信息
    this.getUserInfo();
    //...
  },

  loadWeatherData: function() {
    var citySelected = wx.getStorageSync('citySelected') || [];
    if (citySelected.length == 0) {
      citySelected.unshift("__location__");
      wx.setStorageSync('citySelected', citySelected);
    }

    var that = this
    for (var idx in citySelected) {
      var cityCode = citySelected[idx];
      api.loadWeatherData(cityCode, function (cityCode, data) {
        var weatherData = wx.getStorageSync('weatherData') || {};
        weatherData[cityCode] = data;
        wx.setStorageSync('weatherData', weatherData);
      });
    }
  },

  getUserInfo: function() {
    var that = this
    wx.getUserInfo({
      withCredentials: false,
      success: function (res) {
        that.globalData.userInfo = res.userInfo
      }
    })
  },

  globalData: {
    userInfo: null
  }
})
