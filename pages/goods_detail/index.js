// pages/goods_detail/index.js
const app=getApp()
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_detail:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const res=await app.myAxios({
      url:"goods/detail",
      data:options
    })
    console.log(res)
      this.setData({
        goods_detail:res
      })  
  },
  chooseBinImg(event){
    const { src } = event.currentTarget.dataset
    wx.previewImage({
      current: src,
      urls: this.data.goods_detail.pics.map(v=>v.pics_big)
    })
  },
  goodLike(event){
    wx.showToast({
      title: '收藏成功',
      mask:true,
      duration: 2000
    })
  },
  // 添加购物车
  putin(){
  // 解构商品名称，商品图片，商品价格，商品id
    const { goods_name, goods_small_logo, goods_price, goods_id } = this.data.goods_detail
    // 0.读取本地存储情况
    const cartList = wx.getStorageSync("cartList")||[]
    // 根据id查找是否商品已经存在
    const index=cartList.findIndex(v=>{
      return v.goods_id === goods_id
    })
      // 1.商品不存在得情况
      if(index===-1){
        cartList.push({
          // 添加到数组中
          goods_name, 
          goods_small_logo, 
          goods_price, 
          goods_id,
          // 额外需要商品选中状态，商品数量
          goods_selected:true,
          goods_count:1
        })
         // 2.商品已经存在得情况
      }else {
        cartList[index].goods_count++
        wx.showToast({
          title: '添加成功',
          mask:true
        })
      }
      // 更新本地存储
     wx.setStorageSync("cartList", cartList)
  },
  goCart(){
    wx.switchTab({
      url:"/pages/cart/index"
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