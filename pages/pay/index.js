// pages/cart/index.js
const app = getApp()
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: wx.getStorageSync("address") || {},
    cartList: [],
    totalPrice: 0
  },
  // 获取用户地址信息
  getAddress() {
    wx.chooseAddress({
      success: res => {
        console.log(res)
        const { cityName, countyName, detailInfo, nationalCode, postalCode, provinceName, telNumber, userName } = res
        const address = {
          cityName,
          countyName,
          detailInfo,
          nationalCode,
          postalCode,
          provinceName,
          telNumber,
          userName,
          fullAddress: `${provinceName}${cityName}${countyName}${detailInfo}`
        }
        wx.setStorageSync("address", address)
        this.setData({
          address
        })
      },
      fail: err => {
        wx.showToast({
          title: '您取消了选择地址',
        })
      }

    })
  },
  // 获取用户当前的设置
  getAuthorize() {
    wx.getSetting({
      success: res => {
        console.log(res)
      }
    })
  },
  // 权限设置界面
  getopenSetting() {
    wx.openSetting({
      success: res => {
        console.log(res)
      }
    })
  },
  getAddressHandls() {
    // 获取用户当前的设置
    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.address"] === false) {
          wx.openSetting({
            success: res => {
              this.getAddress()
            }
          })
        } else {
          this.getAddress()
        }
      }
    })
  },
  // 计算价格
  computedCartData() {
    const { cartList } = this.data
    // 总价格
    let totalPrice = 0
    // 总数量
    let totalCount = 0
    cartList.forEach(v => {
      if (v.goods_selected) {
        totalPrice += v.goods_price * v.goods_count
        totalCount++
      }
    })
    this.setData({
      totalPrice,
      totalCount,
      cartList,
      checkAll: cartList.length === totalCount
    })
    // 更新本地存储数据
    wx.setStorageSync("cartList", cartList)
  },
  // 创建订单
orderData(){
  const { address,cartList,totalPrice}=this.data
  const goods = cartList.filter(v=>v.goods_selected).map(v=>{
    return {
      goods_id:v.goods_id,
      goods_number:v.goods_number,
      goods_price:v.goods_price
    }
  })
  return app.myAxios({
    url:"my/orders/create",
    method:"post",
    data:{
      order_price: totalPrice,
      consignee_addr: address.addressDetail,
      goods
    }
  })
  },
  async goPay(){
   const order=await this.orderData()
    console.log(order)
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
  onShow() {
    this.setData({
      address: wx.getStorageSync("address"),
      cartList: wx.getStorageSync("cartList") || []
    })
    this.computedCartData()
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