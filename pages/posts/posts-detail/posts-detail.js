var postdetail = require("../../../data/posts-data");
Page({
    data: {
        isplaymusic: false
    },
    onCollect: function () {
        this.setData({
            collect: !this.data.collect
        })
        var collect_list = wx.getStorageSync('collect');
        var currentId = this.data.id;
        collect_list[currentId] = this.data.collect;
        wx.setStorageSync('collect', collect_list);
        wx.showToast({
            title: this.data.collect ? "收藏成功" : "取消收藏",
            duration: 1000
        })
    },
    onPlayMusic: function () {
        var musicdata = postdetail.localdata[this.data.id];
        if (this.data.isplaymusic) {
            wx.pauseBackgroundAudio();
            this.setData({
                isplaymusic: false
            })
        }
        else {
            wx.playBackgroundAudio({
                dataUrl: musicdata.music.url,
                title: musicdata.music.title,
                coverImgUrl: musicdata.music.coverImg
            });
            this.setData({
                isplaymusic: true
            })
        }
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        console.log(options);
        var id = options.id;
        var detail_list = postdetail.localdata[id];
        console.log(detail_list)
        this.setData({
            id: id,
            detail_list: detail_list
        })
        var collect_list = wx.getStorageSync('collect');
        if (collect_list) {
            var collect = collect_list[id];
            this.setData({
                collect: collect
            })
        }
        else {
            var collect_list = {};
            collect_list[id] = false;
            wx.setStorageSync('collect', collect_list);
        }
    },
    onReady: function () {
        // 页面渲染完成

    },
    onShow: function () {
        // 页面显示

    },
    onHide: function () {
        // 页面隐藏

    },
    onUnload: function () {
        // 页面关闭

    }
})