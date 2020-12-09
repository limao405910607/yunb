// pages/cart/cart.js
import http from '../../utils/http.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品是否被选中
    isSelected: true,
    // 购物车数据列表
    cartlists: [],
    // isMove: false,
    startX: 0,
    allSelected: false,
    totalPrice: '0.00',
    isCheckout: false
  },
  // touchstart事件
  touchStartFn(e) {
    // 按下手指 记录当前的手指坐标点 x坐标点
    console.log(e);
    this.setData({
      startX: e.changedTouches[0].clientX
    })

  },
  touchMoveFn(e) {
    // 移动的时候 我们获取移动的实时的手指坐标点 x坐标
    // 计算差值  （1 可以通过正负值来判断 滑动方向 2 差值的绝对值如果大于一定距离了 才进行滑动才会有效效果）
    let moveX = e.changedTouches[0].clientX;

    let cha = this.data.startX - moveX;

    // 接收到data里面的传递过来的索引idx
    let i = e.currentTarget.dataset.idx

    console.log(cha);

    if (cha > 0 && Math.abs(cha) > 20) {
      // 删除按钮滑动出来
      this.data.cartlists[i].isMove = true

    } else if (cha < 0 && Math.abs(cha) > 20) {
      // 删除按钮滑动进去 隐藏起来
      this.data.cartlists[i].isMove = false

    }
    this.setData({
      cartlists: this.data.cartlists
    })


  },
  // 单击减商品数量
  reduceCount(e) {
    let i = e.currentTarget.dataset.idx;
    // 当前页面要发生数量的更新
    if (this.data.cartlists[i].num - 1 < 1) {
      // 不能减  提示用户 购物车商品数量至少为1件
      wx.showToast({
        title: '不能再减了,商品数量至少为1',
        icon: "none"
      })

    } else {
      // 这里可以减
      this.data.cartlists[i].num--;

      this.setData({
        cartlists: this.data.cartlists
      })
      // 发送请求到后端 让服务器的购物车商品数量发生更新
      // 接口地址： ‘/api/cart/add’。
      // 参数： 传递过去商品id 还有数量num
      // 请求方式post 
      http({
        url: '/api/cart/add',
        method: 'post',
        data: {
          id: this.data.cartlists[i].id,
          num: -1
        },
        successFn: data => {
          console.log(data);

        }
      })
      // 执行一次计算总价
      this.totalPrice();
    }




  },
  // 单击加商品数量
  addCount(e) {
    let i = e.currentTarget.dataset.idx;
    this.data.cartlists[i].num++;
    this.setData({
      cartlists: this.data.cartlists
    })
    // 发请求
    http({
      url: '/api/cart/add',
      method: 'post',
      data: {
        id: this.data.cartlists[i].id,
        num: 1
      },
      successFn: data => {
        console.log(data);

      }
    })
    // 执行一次计算总价
    this.totalPrice();

  },
  // 点按之后 更改是否被选中的处理函数
  changeSelectedFn(e) {
    let i = e.currentTarget.dataset.idx;
    this.data.cartlists[i].selected = !this.data.cartlists[i].selected;
    this.setData({
      cartlists: this.data.cartlists
    })
    // 发起请求 把选择状态 发送到后端 记录一下
    // 接口地址"/api/cart/selected
    // 参数：商品id selected：true/false 打不打勾
    // 请求方式post
    http({
      url: "/api/cart/selected",
      method: 'post',
      data: {
        id: this.data.cartlists[i].id,
        selected: this.data.cartlists[i].selected
      },
      successFn: data => {
        console.log(data);

      }
    })
    // 执行一次计算总价
    this.totalPrice();




    // 计算一下当前全选是否打勾
    this.setData({
      allSelected: this.data.cartlists.every(item => item.selected),
      // 判断是否可以结算
      isCheckout: this.data.cartlists.some(item => item.selected)
    })

  },
  // 点按全选按钮 应该让上面的小圆圈们 都跟着变化
  allSelectedFn() {
    this.data.allSelected = !this.data.allSelected;
    this.data.cartlists.forEach(item => {
      item.selected = this.data.allSelected
    })
    this.setData({
      allSelected: this.data.allSelected,
      // 判断是否可以结算
      isCheckout: this.data.cartlists.some(item => item.selected),
      cartlists: this.data.cartlists
    })
    // 请求一下后端
    // 地址接口："/api/cart/allselected" 
    // 请求方式post
    http({
      url: "/api/cart/allselected",
      method: 'post',
      data: {
        selected: this.data.allSelected
      },
      successFn: data => {
        console.log(data);
      }
    })

    // 执行一次计算总价
    this.totalPrice();


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 请求购物车所有的商品
    // 接口地址：‘/api/cart/list’。
    // 参数 无，
    // 请求方式 post 
    // 响应回来的dataType: json
    http({
      url: '/api/cart/list',
      method: 'post',
      successFn: data => {
        console.log(data);
        // 请求回来所有的购物车数据了
        // 那么应该判断一下是否全选 或不全选


        this.setData({
          cartlists: data.list,
          allSelected: data.list.every(item => item.selected),
          isCheckout: data.list.some(item => item.selected)
        })
        // 执行一次计算总价
        this.totalPrice();
      }
    })
  },
  // 计算选中的商品的总价格
  totalPrice() {
    let price = 0;
    this.data.cartlists.filter(item => item.selected).forEach(item => {
      price += item.price * item.num
    })
    this.setData({
      totalPrice: price.toFixed(2)
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