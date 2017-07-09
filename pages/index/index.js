//index.js
function featureDate(str) {
  var date = new Date(Date.parse(str));
  return date.getMonth() + "/" + date.getDate()
}
function weatherPic(no) {
  return 'https://p.ssl.qhimg.com/dm/60_60_/d/inn/3716a4d4/1-' + no + '.png'
}

//获取应用实例
var app = getApp()
Page({
  data: {
    pic: "https://p.ssl.qhimg.com/dm/60_60_/d/inn/3716a4d4/1-0.png",
    userInfo: {},
    weatherData: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    wx.request({
      url: 'https://open.onebox.so.com/Dataapi?&query=%E5%A4%A9%E6%B0%94&type=weather&ip=&src=soindex&d=pc&url=weather',
      data: {},
      success: function (res) {
        for(var i=0; i<res.data.weather.length; i++) {
          res.data.weather[i].day = featureDate(res.data.weather[i].date);
          res.data.weather[i].pic = weatherPic(res.data.weather[i].info.day[0]);
        }
        that.setData({
          pic: weatherPic(res.data.realtime.weather.img),
          weatherData: res.data
        })
      }
    })
  }
})
