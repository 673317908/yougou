// pages/user/index.js
const app = getApp()
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    token: ""
  },
  getCode(){
    return new Promise((resolve,reject)=>{
      // 调用 wx.login() 获取 code, code 发给后端，后端再发给微信服务器。
      wx.login({
        success:result=>{
          resolve(result.code)
          
        }
      })
    })
  },
  // API 调用
  sendUserData(obj){
    return app.myAxios({
      url:"users/wxlogin",
      method:"post",
      data:obj
    })
  },
  // 获取用户信息，登录 code，换取 token
  async getToken(event){
    // userInfo 有用户头像，和用户昵称，可以保存到本地。
    const code = await this.getCode()
    const {encryptedData,iv,rawData,signature,userInfo}=event.detail
     // 发送用户数据到后端服务器，用于换取 token 值，注意处理登录失败的情况
    const res=await this.sendUserData({
      encryptedData,
      iv,
      rawData,
      signature,
      userInfo,
      code
    })
     // 如果 res 有数据，说明登录成功
    if(res){
      const {token}=res
      // 把 token 保存到本地
      wx.setStorageSync("token",token)
      // 把用户信息也保存到本地
      wx.setStorageSync("userInfo", userInfo)
      // 更新页面数据
      this.setData({
        token,
        userInfo
      })
      // 提示用户登录成功
      wx.showToast({
        title: '登陆成功',
        icon:"success"
      })
    }else {
       // 登录失败，后台返回 null，走 else 逻辑
      wx.showToast({
        // 提示用户登录失败
        title: '登陆失败，请重试',
        icon:"fail"
      })
    }
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

  }
})