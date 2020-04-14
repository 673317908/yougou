//index.js
//获取应用实例
// const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
     swiperImg:[],
     navImg:[],
     title:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(){
    // 轮播图
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      success:res=>{
        this.setData({
          swiperImg:res.data.message
        })
      }
    });

    // 首页导航
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      success:res=>{
        this.setData({
          navImg:res.data.message
        })
      }
    });

    // 楼层
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
      success:res => {
        this.setData({
          title: res.data.message
        })
      }
    });
  },
  backTop(){
    wx.pageScrollTo({
      scrollTop:0
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
    
  }
})