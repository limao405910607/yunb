// pages/productDetail/productDetail.js
import http from '../../utils/http.js'
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
    console.log('哈哈传过来了', options.id);
    // 请求我们的详情页数据 根据id
    http({
      url: '/api/detail',
      data:{
        id: options.id
      },
      successFn:data=>{
        console.log(data);
        this.setData({
          info: data.list
        })
      }
    })
  },
  // 跳转到购物车页面
  gotoCartFn(){
    wx.switchTab({
      url: '../cart/cart'
    })
  },
  //加入购物车
  addCartFn(){
    // 这里加入购物车
    // 把当前的详情页展示的商品加入到购物车去
    // 接口：
    // 地址：'/api/cart/add'
    // 方法： post请求方式
    // 参数： id, num, name, info, price, selected,pic
    let {id,name,pic,description,price} = this.data.info;

    http({
      url:"/api/cart/add",
      // 请求方式需要指定 默认是get请求
      method: 'post',
      data: {
        id,
        name,
        pic,
        price,
        info: description,
        num: 1,
        selected: false
      },
      successFn: data=>{
        console.log(data);
        if(data.status==200){

          // 给用户一个提示
          wx.showToast({
            title: '商品加入成功!',
            icon: 'none'
          })
        }
        
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