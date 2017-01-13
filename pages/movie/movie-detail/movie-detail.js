var app = getApp();
var utils = require("../../../utils/utils.js");
Page({
  data:{
    detail: {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id;
    var _this = this;
    var rooturl = app.globaldata.rooturl;
    var detailurl = rooturl+"/v2/movie/subject/"+id;
    wx.request({
      url: detailurl,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      }, // 设置请求的 header
      success: function(res){
        // success
        var data = res.data;
        var star = [];
        for(var i in data.casts) {
            var temp ={
              starname: data.casts[i].name,
              starimg: data.casts[i].avatars.large
            };
            star.push(temp);
        };
        var detail = {
          img: data.images.large ? data.images.large : "",
          country: data.countries[0],
          title: data.title,
          origin_title: data.original_title,
          wishcount: data.wish_count,
          commentcount: data.comments_count,
          year: data.year,
          geners: data.genres.join("、"),
          stars: utils.tostar(data.rating.stars),
          score: data.rating.average,
          director: data.directors[0].name ? data.directors[0].name:"暂无数据",
          star: star,
          summary: data.summary
        }
        _this.setData({
          detail: detail
        });
         console.log("detail",_this.data);
      }
    })
  }
})