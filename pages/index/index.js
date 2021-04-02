// 引入用来发送请求的方法,一定要把路径补全
import { request } from "../../request/index.js";
wx-Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    // 导航数组
    catesList: [],
    // 楼层数据
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.开始发送异步请求获取轮播图数据
    // 优化的手段可以通过ES6的promise来解决这个问题
    // wx.request({
    //   // url你要请求哪些地方的数据
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   // data表示你要发送什么数据给后台
    //   enableCache: true,
    //   enableHttp2: true,
    //   enableQuic: true,
    //   timeout: 0,
    //   // success成功之后的回掉函数
    //   success: (result) => {
    //     // console.log(result)
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   },
    //   // fail失败之后的回掉函数
    //   fail: (res) => {},
    //   // complete不管是成功还是失败都会调用的函数
    //   complete: (res) => {},
    // })
    // 对方法进行调用
    this.getSwiperList(),
    this.getCateList(),
    this.getFloorList()
  },
   // 获取轮播图数据
  getSwiperList(){
    request({url: '/home/swiperdata'})
    .then(result=>{
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  // 获取分类导航数据
  getCateList(){
    request({url: '/home/catitems'})
    .then(result=>{
      this.setData({
        catesList: result.data.message
      })
    })
  },
  // 获取楼层数据
  getFloorList(){
    request({url: '/home/floordata'})
    .then(result=>{
      this.setData({
        floorList: result.data.message
      })
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