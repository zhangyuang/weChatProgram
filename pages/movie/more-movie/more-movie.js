// pages/movie/more-movie/more-movie.js
var app = getApp();
var utils = require("../../../utils/utils.js");
Page({
  data: {
    url: "",
    moviedata: "",
    title: "",
    start: 20,
    count: 20
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var _this = this;
    var rooturl = app.globaldata.rooturl;
    var nowmovie = rooturl + "/v2/movie/in_theaters";
    var willmovie = rooturl + "/v2/movie/coming_soon";
    var top250 = rooturl + "/v2/movie/top250";
    var kind = options.kind;
    var url = "";
    switch (kind) {
      case "正在热映": url = nowmovie; break;
      case "即将上映": url = willmovie; break;
      case "top250": url = top250; break;
    };
    this.setData({
      title: kind,
      url: url
    });
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      }, // 设置请求的 header
      success: function (res) {
        // success
        var moviedata = [];
        var data = res.data.subjects;
        for (var idx in data) {
          var title = data[idx].title;
          if (title.length >= 6) {
            title = title.substr(0, 6) + "...";
          };

          var temp = {
            stars: utils.tostar(data[idx].rating.stars),
            title: title,
            average: data[idx].rating.average,
            imgurl: data[idx].images.large,
            movieid: data[idx].id,
          };
          moviedata.push(temp);
        }
        console.log(moviedata)
        _this.setData({
          moviedata: moviedata,
        })
      },
    })
  },
  onScroll: function () {
    wx.showNavigationBarLoading();
    var start = this.data.start;
    var count = this.data.count;
    var _this = this;
    console.log("触发下滑")
    wx.request({
      url: this.data.url + "?start=" + start + "&count=" + count,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      }, // 设置请求的 header
      success: function (res) {
        // success
        var moviedata = [];
        var data = res.data.subjects;
        for (var idx in data) {
          var title = data[idx].title;
          if (title.length >= 6) {
            title = title.substr(0, 6) + "...";
          };
          var temp = {
            stars: utils.tostar(data[idx].rating.stars),
            title: title,
            average: data[idx].rating.average,
            imgurl: data[idx].images.large,
            movieid: data[idx].id,
          };
          moviedata.push(temp);
        }
        console.log(moviedata)
        _this.setData({
          moviedata: _this.data.moviedata.concat(moviedata),
          start: _this.data.start+20,
        });
        wx.hideNavigationBarLoading();
      }
    })
  },
  onPullDownRefresh:function(){
    wx.showNavigationBarLoading();
    var _this = this;
    wx.request({
      url: _this.data.url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      }, // 设置请求的 header
      success: function (res) {
        // success
        var moviedata = [];
        var data = res.data.subjects;
        for (var idx in data) {
          var title = data[idx].title;
          if (title.length >= 6) {
            title = title.substr(0, 6) + "...";
          };

          var temp = {
            stars: utils.tostar(data[idx].rating.stars),
            title: title,
            average: data[idx].rating.average,
            imgurl: data[idx].images.large,
            movieid: data[idx].id,
          };
          moviedata.push(temp);
        }
        console.log(moviedata)
        _this.setData({
          moviedata: moviedata,
        })
        wx.hideNavigationBarLoading();
      },
    });

  },
  onToDetail: function(e) {
      var movieid = e.currentTarget.dataset.movieid; 
      console.log("movieid",movieid);
      wx.navigateTo({
        url: "../movie-detail/movie-detail?id="+movieid,
        success: function(res){
          // success
        }
      })
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.title
    });
  }

})