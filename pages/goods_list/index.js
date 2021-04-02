import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList:[],
  },
  
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totalPages:1,
  handleTabsItemChange(e){
    // console.log(e);
    // 获取被点击的标题索引
    const {index}=e.detail;
    // 修改原数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid;
    this.getGoodsList();
  },
  // 获取商品列表数据
  getGoodsList(){
    request({url: '/goods/search',data:this.QueryParams})
    .then(result=>{
      // 获取总条数
      // console.log(result);
      const total=result.data.message.total;
      // 计算总页数
      this.totalPages=Math.ceil(total/this.QueryParams.pagesize),
      console.log(this.totalPages)
      this.setData({
        // 数组拼接
        goodsList:[...this.data.goodsList,...result.data.message.goods]
      }),
      // 关闭下拉刷新的窗口
      wx.stopPullDownRefresh();
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

  },
  onReachBottom:function() {
    console.log("页面触底");
    // 判断还有没有下一页数据
    //  1.获取到总页数
    // 2.获取到当前页码pagesize
    // 3。判断一下，当前的页码是否大于等于总页数
    // 总页数=Math.celi（总条数/页容量pagesize）
    if(this.QueryParams.pagenum>=this.totalPages){
      // 超过了它，表示没有下一页数据了
      wx.showToast({
        title: '没有下一页数据了',
      })
    } else {
      const pagenum=this.QueryParams.pagenum+1;
      this.QueryParams.pagenum=pagenum;
      this. getGoodsList();
    }
  },
  // 2.下拉刷新页面
  // （1）触发下拉刷新事件，需要在页面的json文件中开启一个配置项
  // （2）重置数据数组
  // （3）重置页码，设置为1
  onPullDownRefresh: function () {
    this.setData({
      goodsList:[],
    });
    this.QueryParams.pagenum=1;
    this.getGoodsList();
  }
})