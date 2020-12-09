
// pages/selectCity/selectCity.js

// 1  围绕定位
    //  （1.1 点击定位的时候 调用微信的api  wx.getLocation 来获取经纬度 从而渲染了map组件）
    //  （1.2 点击定位 用了百度地图api  
    //        1.2.1 进入到百度地图平台 注册账号 创建应用 （微信小程序） 输入appid 生成应用
    //        拿到ak
    //        1.2.2 下载 微信apidemo文档  （bmap-wx.min.js）
    //        1.2.3 引入到你的页面中 开始用百度地图（配置你的ak）
    //         从它里面去获取城市名字数据


// 2 点击热门城市
    // 2.1 打开页面 onload钩子函数 发起请求城市列表
    // 2.2 渲染这些城市
    // 2.3 添加点按事件 触发一个函数 里面 wx.relaungh 发起跳转 并传递城市名称到food页面
    // 2.4 把城市名称cityName 给 food页面中 location

    // 另外一种方式 你可以正常使用 wx.navigateBack / wx.switchTab() 去跳转
    // 数据可以在当前页面中调用 getApp() 获取到全局的app实例对象 app.globalData 设置城市名字

// 引入 百度地图 的 微信版压缩文件
let bmap = require('../../libs/bmap-wx.min.js')
// 引入http
import http from '../../utils/http.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '',
    latitude: '',
    mapShow: false,
    citylist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */

   // 获取位置的方法
  getLoc(){
    // 如果第一次调用这个方法 定位
    // 提醒你需要设置一个权限  在app.json配置
    // "permission": {
    //   "scope.userLocation": {
    //     "desc": "你的位置信息将用于小程序位置接口的效果展示"
    //   }
    // }
    wx.getLocation({
      success:data=>{
        console.log(data);
        // 根据返回的当前的位置的经纬度来再获取到城市 
        // data.longitude
        // data.latitude
        this.setData({
          mapShow: true,
          latitude: data.latitude,
          longitude: data.longitude
        })
        // 使用一下百度地图api接口
        // 1 去百度地图api平台注册账号
        // 2 创建应用：小程序 输入appid
        // 3 ak:应用密钥
        // 4
      }
    })

    // 使用百度地图api
    var BMap = new bmap.BMapWX({
      ak: 'knF7cYwM0lUZj0VntDAqkALc3zDFMGmN'
    });
    BMap.regeocoding({
      success: data=>{
        // console.log("来自百度的数据：",data);
        // 拿到当前的城市名称 
        let cityName = data.originalData.result.addressComponent.city;
        cityName = cityName.slice(0,-1);
        console.log(cityName);
        //跳转到 食疗坊页面 并且把 那边的location改成当前的城市名字
        // wx.navigateBack({}) 没有url
        // wx.switchTab() 里面url不能带参数

        // 把当前获取到的城市名字 存入到本地存储中
        wx.setStorageSync('cityName', cityName)
        
        setTimeout(()=>{
          wx.reLaunch({
            url: '../food/food?cityName=' + cityName,
          })
        },5000);
        
      }
      
    })

  },
  // 热门城市点击 切换城市
  changeCity(e){
    wx.setStorageSync('cityName', e.currentTarget.dataset.city)
    wx.reLaunch({
      url: '../food/food?cityName=' + e.currentTarget.dataset.city,
    })
  },
  onLoad: function (options) {
    // 获取所有的城市列表
    http({
      url: '/api/city',
      successFn: data=>{
        console.log(data);
        
        this.setData({
          citylist: data.list
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