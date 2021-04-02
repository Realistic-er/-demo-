// pages/cart/index.js
// import { getSetting,chooseAddress,openSetting } from '../../utils/asyncWX'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    checkGOODSCart:[],
    totalPrice:0,
    totalNum:0
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  // 页面加载的时候
  // 1.从缓存中获取购物车数据，渲染到页面中
  // 这些数据有个特点，checked是等于true
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  // 设置购物车状态的同时重新计算底部工具栏的数据
  // 全选/价格/购物的数量
  setCart(goods_cart){
    // const allchecked=goods_cart.length?goods_cart.every(v=>v.checked=true):false;
    let totalPrice=0;
    let totalNum=0;
    goods_cart.forEach(v=>{
        totalPrice+=v.goods_price*v.num,
        totalNum+=v.num;
    })
    // 判断数组是否为空
   
    // 2.给data赋值
    this.setData({
      goods_cart,
      totalPrice,
      totalNum
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 1.获取用户在本地存储的收货地址数据
    const address=wx.getStorageSync("address");
    // 当它是一个空字符串的时候，让它等于一个数组，确保类型正确
    let goods_cart=wx.getStorageSync("cart")||[];
    console.log(goods_cart)
    // 计算全选
    // 转到这一页面的时候，让allchecked为全选状态
    // let allchecked=true;
    // const allchecked=goods_cart.length?goods_cart.every(v=>v.checked=true):false;
    // let totalPrice=0;
    // let totalNum=0;
    // goods_cart.forEach(v=>{
    //   if(v.checked) {
    //     totalPrice+=v.goods_price*v.num;
    //     totalNum+=v.num;
    //   } else {
    //     allchecked=false;
    //   }
    // })
    // 判断数组是否为空
    // allchecked=goods_cart.length!=0?allchecked:false;
    // 2.给data赋值
    goods_cart=goods_cart.filter(v=>v.checked);
    console.log(goods_cart)
    this.setData({
      address
    });
    // 对购物车数组进行过滤
    
    this.setCart(goods_cart);
    // console.log(goods_cart)
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
  // 获取用户对小程序所授予地址的权限状态scope
  // 1.假设用户点击收货地址的提示框，点击的是确定的话，
  // 它的只为true，直接调用获取收获地址
  
  // 2.假设用户从来没有调用过收货地址的api
  // 它的值为undefined，会直接调用获取收货地址
  // 3.假设用户点击收货地址的提示框，取消（拒绝过）
  // 它的值为false
  //   （1）诱导用户自己打开授权设置页面
  // 当用户重新给予获取地址权限的时候
  //    （2）
  // handleAddress() {
  //   // 1.获取权限状态
  //   wx.getSetting({
  //     withSubscriptions: true,
  //     success: (result) => {
  //       // 2.获取权限状态
  //       // 属性名很怪异的时候
  //       const scopeAddress=result.authSetting['scope.address']
  //       if(scopeAddress===true || scopeAddress===undefined) {
  //         wx.chooseAddress({
  //           success: (result1) => {
  //             wx.setStorageSync('address', result1)
  //           },
  //         })
  //       } else {
  //         // 用户曾经拒绝过授予权限，先诱导用户打开授权页面
  //         wx.openSetting({
  //           withSubscriptions: true,
  //           success: (result2) => {
  //             wx.chooseAddress({
  //               success: (result3) => {
  //                 wx.setStorageSync('address', result3)
  //               },
  //             })
  //           },
  //           fail: (res) => {},
  //           complete: (res) => {},
  //         })
  //       }
  //     },
  //     fail: (res) => {},
  //     complete: (res) => {},
  //   })
    
  // },
  // handleSub(e) {
  //   console.log(e);
  //   const index=e.currentTarget.dataset.index;
  //   console.log(index);
  //   this.goods_cart[index].num--
  // },
  // handleAdd(e) {
  //   const index=e.currentTarget.dataset.index;
  // //   this.goods_cart[index].num++
  // },
  // 商品的选中
  // handleItemChange(e){
  //   console.log(e);
  //   const index=e.currentTarget.dataset.index;
  //   // 获取购物车数组
  //   let goods_cart=this.data.goods_cart
  //   // 找到被修改的商品对象
  //   // goods_cart[index].checked
  //   // 选中状态取反
  //   goods_cart[index].checked=!goods_cart[index].checked;
  //   // 把购物车数据重新设置回给data中和缓存中
  //   // this.setData({
  //   //   goods_cart
  //   // });
  //   this.setCart(goods_cart);

  // },
  // handleItemAllChange() {
  //   // 1.获取data中的数据
  //   let {goods_cart,allchecked}=this.data;
  //   // 2.修改值
  //   allchecked=!allchecked;
  //   // 3.循环修改
  //   goods_cart.forEach(v=>v.checked=allchecked);
  //   console.log(allchecked);
  //   // 4.把修改过的值都填充会data和缓存中
  //   this.setCart(goods_cart);
  // },
  // handleEdit(e){
    
  //   // return;
  //   console.log(e);
  //   // 1.获取传递过来的参数
  //   const {operation,index}=e.currentTarget.dataset;
  //   // console.log(operation,index)
  //   // 2.获取购物数组
  //   let {goods_cart}=this.data;
  //   if(goods_cart[index].num===1&&operation===-1){
  //     // 弹窗提示
  //     wx.showModal({
  //       title: '提示',
  //       content: '您是否要删除',
  //       success: (res)=> {
  //         if (res.confirm) {
  //           console.log('用户点击确定')
  //           goods_cart.splice(index,1);
  //           this.setCart(goods_cart)
  //         } else if (res.cancel) {
  //           console.log('用户点击取消')
  //         }
  //       }
  //     })
  //   }
  //   // 3.进行修改数量
  //   goods_cart[index].num+=operation;
  //   // 5当购物车的数量=1的同时，用户点击-
  //   // 弹窗提示询问用户是否要删除
  //   // 4.
  //   this.setCart(goods_cart);
  // },
  handlePay(){
    // 1.判断收获地址
    const {address,totalNum}=this.data;
    if (!address.userName) {
      wx.showToast({
        title: '请添加收获地址',
        icon: 'success',
        duration: 2000
      });
      return
    }
    if (totalNum===0) {
      wx.showToast({
        title: '请添加商品',
        icon: 'success',
        duration: 2000
      });
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    })
  },
  handleOrderPay(){
    // 1.判断缓存中有没有token
    const token=wx.getStorageSync("token")
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      })
      return;
    }
  }
})