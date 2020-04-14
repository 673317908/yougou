const baseUrl ="https://api.zbztb.cn/api/public/v1/"

export const myAxios=(params)=>{
    // 判断路径中是否有/my，如果没有就添加token
  if(params.url.indexOf("/my")!==-1){
    // 读取本地token
    const token=wx.getStorageSync("token")
    // 判断是否有token，如果没有就添加请求头
    if(token){
        params.header.Authorization=token
      }else {
        wx.switchTab({
          url: '/pags/user/inedx',
        })
      }
      return new Promise(()=>{})
  }
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url: baseUrl + params.url,
      // 成功
      success:res=>{
        resolve(res.data.message)
      },
      // 失败
      fail:error=>{
        reject(error)
      },
      // 完成
      complete:()=>{
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  })
}