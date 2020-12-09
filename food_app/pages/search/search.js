// pages/search/search.js
import http from '../../utils/http.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
     productLists: []
  },
  productDetailFn(e){
    console.log(e);
    wx.navigateTo({
      url: '../productDetail/productDetail?id=' + e.currentTarget.dataset.id,
    })
   },
  // input事件触发的函数
  inputFn(e) {

    console.log("哈哈输入值拉：",e.detail.value)

    //调用后端接口 搜索指定的内容
    http({
      url: '/api/foods/search',
      data:{
        name: e.detail.value
      },
      successFn: data=>{

        console.log(data);
        this.setData({
          productLists: data.list
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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