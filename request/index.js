
// 同时
// wx-wx.request里边的参数通过调用const request=()
// 里边的参数来使用
let ajaxTimec = 0;
export const request=(params)=>{
  ajaxTimec++;
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  // 定义公共的url
  const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve,reject)=>{
    // resolve是请求成功之后的函数
    // reject是请求失败之后的函数
    wx-wx.request({
      // 通过...将数据结解构出来
      ...params,
      url:baseUrl+params.url,
      // 请求成功之后会有一个result
      // 然后把result放到resolve中,
      success:(result)=>{
        resolve(result)
      },
      fail:(err)=>{
        reject(err)
      },
      // complete
      complete:()=>{
        ajaxTimec--;
        setTimeout(function() {
          wx.hideLoading()
        },2000)
      }
    })
  })
}