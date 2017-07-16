// detail.js
//获取应用实例
var app = getApp()
var wxCharts = require('../../libs/wxcharts-min.js');
var lineChart = null;
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

    // var categories = ["1", "2" ,"3"]
    // var data = [2, 3, 4]
    // this.showLine("200", categories, data)
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

  showLine: function (height, categories, data) {
    var windowWidth = 350;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    lineChart = new wxCharts({
      canvasId: 'lineTemperature',
      type: 'line',
      categories: categories,
      // animation: true,
      background: '#f5f5f5',
      series: [{
        data: data,
        format: function (val, name) {
          return val.toFixed(0) + '°C';
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        format: function (val) {
          return val.toFixed(0);
        },
        // min: 0
      },
      width: windowWidth,
      height: height,
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})