//index.js

//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    weatherData: {},
    topCityList: {}
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
    var cityList = wx.getStorageSync('cityList');
    var weatherData = wx.getStorageSync('weatherData');
    var topCity = {
      left: "",
      center: "",
      right: "",
    };

    var current = event.detail.current;
    try { topCity.left = weatherData[cityList[current-1]].realtime.city_name; } catch (e) { }
    try { topCity.center = weatherData[cityList[current]].realtime.city_name; } catch (e) { }
    try { topCity.right = weatherData[cityList[current + 1]].realtime.city_name; } catch (e) { }

    this.setData({
      topCity: topCity,
    })
  },

  onLoad: function () {
    //临时跳转
    // this.showDetailPage({ currentTarget: { dataset: { city_code:"101030100"}}}); return;

    var cityList = wx.getStorageSync('cityList');
    var weatherData = wx.getStorageSync('weatherData');
    var topCity = {
      left: "",
      center: "",
      right: "",
    }
    try{ topCity.center = weatherData[cityList[0]].realtime.city_name; } catch(e){ }
    try{ topCity.right = weatherData[cityList[1]].realtime.city_name; } catch (e) { }
    
    this.setData({
      userInfo: app.globalData.userInfo,
      weatherData: weatherData,
      topCity: topCity,
      cityList: cityList,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
