
var apiLocalWeatherUrl = 'https://open.onebox.so.com/Dataapi?&query=%E5%A4%A9%E6%B0%94&type=weather&ip=&src=soindex&d=pc&url=weather';
var apiCityWeatherUrl = 'https://open.onebox.so.com/Dataapi?callback=&query=%E5%8C%97%E4%BA%AC%E5%B8%82%E5%8C%97%E4%BA%AC%E6%B5%B7%E6%B7%80%E5%A4%A9%E6%B0%94&type=weather&ip=&src=soindex&d=pc&url=http%253A%252F%252Fcdn.weather.hao.360.cn%252Fsed_api_weather_info.php%253Fapp%253DguideEngine%2526fmt%253Djson%2526code%253D';

function loadWeatherData(cityCode, cb) {
  var apiWeatherUrl = apiLocalWeatherUrl;
  if (cityCode != "" && cityCode != "__location__") {
    apiWeatherUrl = apiCityWeatherUrl + cityCode;
  }

  wx.request({
    url: apiWeatherUrl,
    data: {},
    success: function (res) {
      if (res.statusCode != 200 || res.data.length == 0) {
        return;
      }

      var weatherData = parseWeatherData(res.data);
      typeof cb == "function" && cb(cityCode, weatherData)
    }
  })
}

function parseWeatherData(data) {
  data.realtime.weather.pic = weatherPic(data.realtime.weather.img);
  for (var i = 0; i < data.weather.length; i++) {
    data.weather[i].shortDate = shortDate(data.weather[i].date);
    data.weather[i].pic = weatherPic(data.weather[i].info.day[0]);
  }
  return data;
}

function weatherPic(no) {
  return 'https://p.ssl.qhimg.com/dm/60_60_/d/inn/3716a4d4/1-' + no + '.png'
}

function shortDate(str) {
  var date = new Date(Date.parse(str));
  return date.getMonth() + "/" + date.getDate()
}

module.exports = {
  loadWeatherData: loadWeatherData
}