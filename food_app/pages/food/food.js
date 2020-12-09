// pages/food/food.js
//  导入分类数据
let classifyData = require('../../utils/classifyData.js')
console.log(classifyData);

import http from '../../utils/http.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: '北京',
     classifyList: classifyData,
     prodcutlist: [],
     pageNum :1,
     btnVal: '点击加载更多...',
     btnShow: true
  },
  // 封装一个获取数据的方法
  getData(successFn){
    http({
      url: '/api/foods/list',
      data: {
        city: this.data.location,
        page: this.data.pageNum
      },
      successFn:data=>{
        successFn(data);
      }
    })
  },
  // 定义产品分类处理函数
  productTypeFn(e){
    console.log(e.currentTarget.dataset.typeid);
    let id = e.currentTarget.dataset.typeid;
    wx.navigateTo({
      url: '../productType/productType?typeid=' + id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  productDetailFn(e){
    console.log(e);
    wx.navigateTo({
      url: '../productDetail/productDetail?id=' + e.currentTarget.dataset.id,
    })
   },
  onLoad: function (options) {

    // 当前页面 一加载 就立即尝试从本地存储中获取城市名字

    console.log(options);
    this.setData({
      location: wx.getStorageSync('cityName') || options.cityName || this.data.location
    })
    //  请求食疗坊的商品数据接口
    //  city：代表城市 page 第几页数据
    this.getData((data)=>{
      // 食疗坊下面的列表数据 返回拉
      if(data.msg == '没有数据了'){
       this.setData({
        btnVal: '没有更多数据哦～'
       })
      }
      this.setData({
        prodcutlist: data.list,
        btnShow: false
      })

    });
    // wx.request({
    //   url: 'http://localhost:5000/api/foods/list',
    //   data:{
    //     city: this.data.location,
    //     page: 1
    //   },
    //   success:res=>{

    //     console.log(res);
    //     this.setData({
    //       prodcutlist: res.data.list
    //     })
    //   }
    // })
  },
  // 点击按钮 获取更多数据
  getMore(){
    this.setData({
      pageNum: this.data.pageNum + 1
    })
    this.getData(data=>{
      if(data.msg == '没有数据了'){
        this.setData({
          btnVal: '没有更多数据哦～'
        })
      }else {
        this.setData({
          prodcutlist: this.data.prodcutlist.concat(data.list)
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
   * 页面相关事件处理函数--监听用户下拉动作  下拉刷新需要 app.json中开启 下拉功能才可以用
   */
  onPullDownRefresh: function () {  // 重新请求第一页数据
    // 页面pageNum  =1 
    this.setData({
      pageNum: 1
    })
     this.getData(data=>{
       console.log(data);
       this.setData({
         prodcutlist: data.list
       })
     })
  },

  /**
   * 页面上拉触底事件的处理函数  直接可以用
   */
  onReachBottom: function () {
    // console.log('哈哈哈 上拉拉'); //可以请求更多的数据 请求第二页数据 甚至第三页数据
    
    // this.setData({
    //   pageNum: this.data.pageNum+1
    // })

    // this.getData(data=>{
    //   console.log(data);
    //   if(data.msg=="没有数据了"){
    //     wx.showToast({
    //       title: '没有更多数据拉'
    //     })
    //   }else {
    //     this.setData({
    //       prodcutlist: this.data.prodcutlist.concat(data.list)
    //     })
    //   }
     
    // });
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})