var postlist = require("../../data/posts-data.js");
console.log(postlist);
Page({
  data:{
      
  },
  onTap:function(e) {
      console.log(e);
      var postId = e.currentTarget.dataset.postid;
      console.log("postid",postId);
      wx.navigateTo({
        url: 'posts-detail/posts-detail?id='+postId,
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
   
   this.setData({
       postlist: postlist.localdata
   })
   console.log("111",postlist)
  },
  onReady:function(){
    // 页面渲染完成
     
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  }
})
