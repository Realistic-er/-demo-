// pages/goods_detail/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  // 返回的图片数据中，
  data: {
    goodsObj:{}
  },
  GoodsInfo:{},
  getGoodsDetail(goods_id){
    request({url: '/goods/detail',data:{goods_id}})
    .then(result=>{
      const goodsObj=result.data.message;
      this.setData({
        goodsObj:{
          goods_name:goodsObj.goods_name,
          goods_price:goodsObj.goods_price,
          goods_introduce:goodsObj.goods_introduce.replace(/.web/,'.jpg'),
          pics:goodsObj.pics
        }
      }),
      this.GoodsInfo=goodsObj
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    const {goods_id}=options;
    this.getGoodsDetail(goods_id)
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

  },
  handlePreivewImage(e){
    // 1先构造要预览的图片数组
    const urls=this.GoodsInfo.pics.map(v=>v.pics_mid);
    const current=e.currentTarget.dataset.url;
    console.log(e);
    wx.previewImage({
      // current接受传递过来的参数
      current,
      urls
    })
  },
  // 点击加入购物车
  handleCart(e) {
    // console.log(e);
    // 1.获取缓存中的购物车数据
    let cart=wx.getStorageSync("cart")||[];
    // 2.开始判断商品是否存在于购物车中
    let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if (index===-1) {
      // 不存在的话，第一次添加
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo);
    } else {
      // 4.已经存在购物车数据，执行num++
      cart[index].num++;
    }
    // 5.把购物车重新添加到缓存中
    wx.setStorageSync('cart', cart)
    // 6.弹出提示信息
    wx-wx.showToast({
      title: '加入成功',
      // duration这是持续的时间
      duration: 2000,
      // icon是图标
      icon: 'success',
      image: 'image',
      // mask用来加图层
      mask: true,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  }
})