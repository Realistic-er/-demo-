// pages/category/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的商品数据
    leftMenuList: [],
    // 右侧的商品数据
    rightContent: [],
    scrollTop:0,
  },
  // 接口的返回数据
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断本地存储有没有就数据
    // 存一个对象，对象中有两个属性
    // {time:Date.now(),data:[...]}
    // 没有旧数据，直接发送新请求
    // 有旧的数据，同时旧的数据也没有过期，就是用本地存储
    // 中的旧的数据
    // this.getCates();
    // 1.获取本地存储中的数据，小程序也是存在本地存储技术
    // getStorageSync('key')中key是一个标志
    // 这里将key写成cates
    const Cates=wx.getStorageSync("key");
    // 开始判断
    if(!Cates){
      // 不存在发送请求获取数据
      this.getCates();
    }else{
      // 有旧的数据了
      // 还得判断一下有没有过期
      // 判断一下过期时间
      // 定义过期时间
      if(Date.now()-Cates.time>1000*10){
        // 过期了的话重新发送请求
        this.getCates();
      }else{
        // 可以使用旧的数据
        this.Cates=Cates.data;
        // 对页面进行一次渲染
        // 构造左侧的大菜单数据
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        // 构造右侧的商品数据
        let rightContent=this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent,
          // 重新设置右侧内容的scroll-view标签的距离顶部
          // 的距离
          scrollTop:0,
        })
      }
    }
  },
  getCates(){
    request({
      url: "/categories"
    })
    .then(res=>{
      this.Cates = res.data.message;
      // 把接口的数据存入到本地存储中
      wx.setStorageSync('key', {time:Date.now(),data:this.Cates});
      // 构造左侧的大菜单数据
      let leftMenuList=this.Cates.map(v=>v.cat_name);
      // 构造右侧的商品数据
      let rightContent=this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  handleItemTap(e){
    console.log(e)
    // 1.点击事件触发后，获取被点击的标题身上的索引
    // 给data中的currentIndex赋值就可以了
    const {index} = e.currentTarget.dataset;
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent
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