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
    var cityList = wx.getStorageSync('cityList') || [];
    if (cityList.length == 0) {
      cityList.unshift("__location__");
      wx.setStorageSync('cityList', cityList);
    }
    console.log(cityList)
    console.log(wx.getStorageSync('weatherData'))

    var that = this
    for (var idx in cityList) {
      var cityCode = cityList[idx];
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
