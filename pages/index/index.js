//index.js
var api = require('../../libs/api')

//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    citySelected: {},
    weatherData: {},
    topCity: {}
  },

  //事件处理函数
  showDetailPage: function(e) {
    try{
      var cityCode = e.currentTarget.dataset.city_code || '';
    } catch(e){}
  
    wx.navigateTo({
      url: '../detail/detail?city_code=' + cityCode
    })
  },
  showSettingPage: function () {
    wx.navigateTo({
      url: '../setting/setting'
    })
  },
  updateTopCity : function(event){
    var citySelected = wx.getStorageSync('citySelected');
    var weatherData = wx.getStorageSync('weatherData');
    var topCity = {
      left: "",
      center: "",
      right: "",
    };

    var current = event.detail.current;
    try { topCity.left = weatherData[citySelected[current-1]].realtime.city_name; } catch (e) { }
    try { topCity.center = weatherData[citySelected[current]].realtime.city_name; } catch (e) { }
    try { topCity.right = weatherData[citySelected[current + 1]].realtime.city_name; } catch (e) { }

    this.setData({
      topCity: topCity,
    })
  },

  onLoad: function () {
    var defaultCityCode = "__location__";
    var citySelected = wx.getStorageSync('citySelected');
    var weatherData = wx.getStorageSync('weatherData');
    if (citySelected.length == 0 || weatherData.length == 0) {
      var that = this
      api.loadWeatherData(defaultCityCode, function (cityCode, data) {
        var weatherData = {}
        weatherData[cityCode] = data;
        that.setHomeData([cityCode], weatherData);
      });
    } else {
      this.setHomeData(citySelected, weatherData);
    }
  },

  onShow:function() {
    var citySelected = wx.getStorageSync('citySelected');
    this.setData({
      citySelected: citySelected,
    })
  },

  setHomeData: function (citySelected, weatherData) {
    var topCity = {
      left: "",
      center: "",
      right: "",
    }
    try { topCity.center = weatherData[citySelected[0]].realtime.city_name; } catch (e) { }
    try { topCity.right = weatherData[citySelected[1]].realtime.city_name; } catch (e) { }

    this.setData({
      userInfo: app.globalData.userInfo,
      weatherData: weatherData,
      topCity: topCity,
      citySelected: citySelected,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
