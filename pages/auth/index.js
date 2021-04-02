// pages/auth/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  getUserInfo(userInfo) {
    request({
      data: userInfo,
      url: "/users/wxlogin",
      method:"post"
    })
    .then(res=>{
      console.log(res);
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

  },
  handle_getUserInfo(e){
    // 获取用户信息
    console.log(e);
    const { encryptedData,rawData,iv,signature }=e.detail;
    // 2.获取小程序登陆成功后的code值
    wx.login({
      timeout: 10000,
      success: (result) => {
        // const {code}=result;
        // console.log(result);
        const code=result.code;
        console.log(code)
        const userInfo={encryptedData,rawData,iv,signature,code};
        this.getUserInfo(userInfo);
      }
    })
    
  }
})