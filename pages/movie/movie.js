var app = getApp();
var utils = require("../../utils/utils.js");
Page({
  data: {
    nowmovie: {},
    willmovie: {},
    top250: {},
    searchResult: {},
    searchshow: false,
    containershow: true
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var _this = this;
    var readydata = {};
    var rooturl = app.globaldata.rooturl;
    var nowmovie = rooturl + "/v2/movie/in_theaters" + "?start=0&count=3";
    var willmovie = rooturl + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250 = rooturl + "/v2/movie/top250" + "?start=0&count=3";
    wx.request({
      url: nowmovie,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      }, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)
        var nowmoviedata = [];
        var nowdata = res.data.subjects;
        console.log("正在热映", nowdata)
        for (var idx in nowdata) {
          var title = nowdata[idx].title;
          if (title.length >= 6) {
            title = title.substr(0, 6) + "...";
          };

          var temp = {
            stars: utils.tostar(nowdata[idx].rating.stars),
            title: title,
            average: nowdata[idx].rating.average,
            imgurl: nowdata[idx].images.large,
            movieid: nowdata[idx].id,
          };
          nowmoviedata.push(temp);
        }

        readydata["nowmovie"] = {
          head: "正在热映",
          movies: nowmoviedata
        }
        console.log(readydata)

        _this.setData(readydata);
        console.log(_this.data)
      },
      fail: function () {
        // fail
      },
    });
    wx.request({
      url: willmovie,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      }, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)
        var willmoviedata = [];
        var willdata = res.data.subjects;
        console.log("即将上映", willdata)
        for (var idx in willdata) {
          var title = willdata[idx].title;
          if (title.length >= 6) {
            title = title.substr(0, 6) + "...";
          };

          var temp = {
            stars: utils.tostar(willdata[idx].rating.stars),
            title: title,
            average: willdata[idx].rating.average,
            imgurl: willdata[idx].images.large,
            movieid: willdata[idx].id,
          };
          willmoviedata.push(temp);
        }
        readydata["willmovie"] = {
          head: "即将上映",
          movies: willmoviedata
        }

        _this.setData(readydata);
        // _this.setData({
        //     willmoviedata: willmoviedata
        // })
      },
    });
    wx.request({
      url: top250,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      }, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)
        var top250 = [];
        var topdata = res.data.subjects;
        console.log("top250", topdata)
        for (var idx in topdata) {
          var title = topdata[idx].title;
          if (title.length >= 6) {
            title = title.substr(0, 6) + "...";
          };

          var temp = {
            stars: utils.tostar(topdata[idx].rating.stars),
            title: title,
            average: topdata[idx].rating.average,
            imgurl: topdata[idx].images.large,
            movieid: topdata[idx].id,
          };
          top250.push(temp);
        }
        readydata["top250"] = {
          head: "top250",
          movies: top250
        }
        console.log(top250)
        _this.setData(readydata);
        //console.log("111",_this.data)
      },
    });
  },
  onMoreMovie: function (e) {
    var kind = e.currentTarget.dataset.kind;
    console.log(kind)
    wx.navigateTo({
      url: 'more-movie/more-movie?kind=' + kind,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  onSearch: function () {
    this.setData({
      searchshow: true,
      containershow: false
    })
  },
  onCloseSearch: function () {
    this.setData({
      searchshow: false,
      containershow: true
    })
  },
  onSearchChange: function (e) {
    var text = e.detail.value;
    var _this = this;
    var readydata = {};
    console.log(text);
    var searchUrl = app.globaldata.rooturl + "/v2/movie/search?q=" + text;
    wx.request({
      url: searchUrl,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      }, // 设置请求的 header
      success: function (res) {
        // success
        wx.showNavigationBarLoading();
        var searchResult = [];
        var Resultdata = res.data.subjects;
        for (var idx in Resultdata) {
          var title = Resultdata[idx].title;
          if (title.length >= 6) {
            title = title.substr(0, 6) + "...";
          };
          var temp = {
            stars: utils.tostar(Resultdata[idx].rating.stars),
            title: title,
            average: Resultdata[idx].rating.average,
            imgurl: Resultdata[idx].images.large,
            movieid: Resultdata[idx].id,
          };
          searchResult.push(temp);
        };
        readydata["searchResult"] = {
          head: "search",
          moviedata: searchResult
        }
        _this.setData(readydata);
        wx.hideNavigationBarLoading();
      }
    })
  },
  onToDetail: function(e) {
      var movieid = e.currentTarget.dataset.movieid; 
      console.log("movieid",movieid);
      wx.navigateTo({
        url: "movie-detail/movie-detail?id="+movieid,
        success: function(res){
          // success
        }
      })
  }

})