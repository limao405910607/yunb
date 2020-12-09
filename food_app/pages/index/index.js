// pages/index/index.js

// 导入http模块
import http from '../../utils/http.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIdx: 0,
    bannerList: [],
    newslist: []
  },
  // 轮播图change事件处理函数
  swiperChange(e){
    // console.log(e);
    this.setData({
      currentIdx: e.detail.current
    })
  },
  // 跳转到详情页的事件处理函数
  indexDetailFn(e){
    console.log(e.currentTarget.dataset.id);
    // 通过调用api 发起跳转
    wx.navigateTo({
      url: '../details/details?itemid=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   * 
   */
  onLoad: function (options) {

     

     // 发起请求 请求banner数据
     // wx.request()
     // url地址：有两种情况：

     // 1 如果你的服务器地址是部署在线上的
     // 必须在微信后台设置服务器域名白名单 
     // 这样才可以请求数据成功
     // 注意这个域名必须是https协议才能请求成功

     // 2 如果不是线上服务器 是本地服务器 或者ip地址 你可以找到微信右上角---详情---本地设置里面----打勾 不校验合法域名
     
     // 显示一个正在加载数据的提示框
     wx.showLoading({
       title: '数据正在加载中...',
     })


     http({
       url: '/api/banner',
       successFn: data=>{
         console.log(data);
         this.setData({
          bannerList: data.data
        })
       }
     })

    //  wx.request({
    //    url: 'http://127.0.0.1:5000/api/banner',
    //    success: res=>{

    //     console.log(res.data)
    //     this.setData({
    //       bannerList: res.data.data
    //     })
    //    }
    //  })

     // 发起一个请求  首页食疗新闻数据
     http({
       url: '/api/indexlist',
       successFn:data=>{
        wx.hideLoading({
          success: (res) => {
            console.log('数据已经加载完毕');
            wx.showToast({
              title: '数据加载完毕'
            })

          },
        })
        this.setData({
          newslist: data.list
        })
       }
     })
    //  wx.request({
    //    url: 'http://localhost:5000/api/indexlist',
    //    success:res=>{
    //     console.log(res);
    //     // 隐藏加载框
    //     wx.hideLoading({
    //       success: (res) => {
    //         console.log('数据已经加载完毕');
    //         wx.showToast({
    //           title: '数据加载完毕'
    //         })

    //       },
    //     })
    //     this.setData({
    //       newslist: res.data.list
    //     })

    //    }
    //  })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})