// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options) // { itemid: }
    // 打开详情页 就立即让导航栏标题显示加载样式
    wx.showNavigationBarLoading({})

    wx.request({
      url: 'http://localhost:5000/api/detail',
      data:{
        id: options.itemid
      },
      success:res=>{
        //隐藏导航栏 加载样式
        wx.hideNavigationBarLoading({});
       
        console.log(res);
        this.setData({
          info: res.data.list
        })
         // 导航栏标题根据请求回来的数据标题而变化
        wx.setNavigationBarTitle({
          title: res.data.list.title,
        })
      }
    })
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