// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftcategory: wx.getStorageSync("leftcategory")||[],
    rightcategory:wx.getStorageSync("rightcategory") || [],
    activeIndex:0,
    scrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options){
   if(this.data.leftcategory.length===0){
     wx.request({
       url: 'https://api.zbztb.cn/api/public/v1/categories',
       success: res => {
         console.log(res)
         const leftcategory = res.data.message
         const rightcategory=leftcategory[0].children
         wx.setStorageSync("leftcategory", leftcategory)
         wx.setStorageSync("rightcategory", rightcategory)
         this.setData({
           leftcategory, rightcategory
         })
       }
     });
   }
  },
  choose(event){
    console.log(event)
    const {index} =event.currentTarget.dataset
    
    this.setData({
      scrollTop: 0,
      activeIndex:index,
      rightcategory : this.data.leftcategory[index].children
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