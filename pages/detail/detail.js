// detail.js
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topCity: {},
    weatherInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载天气数据
    this.loadWeatherData(options)
  },

  loadWeatherData: function (options) {
    var cityCode = options.city_code || '';
    if (cityCode == "") {
      wx.navigateBack();
    }
    var weatherData = wx.getStorageSync('weatherData');
    var weatherInfo = weatherData[cityCode];
    if (weatherInfo == undefined) {
      wx.navigateBack();
    }

    var topCity = {
      left: "",
      center: "",
      right: "",
    }
    try { topCity.center = weatherInfo.realtime.city_name; } catch (e) { }

    this.setData({
      userInfo: app.globalData.userInfo,
      weatherInfo: weatherInfo,
      topCity: topCity,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})