// pages/goods_list/index.js
import {myAxios} from "../../utils/myaxios"
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    options: {},
    bl:[
      {   
        name:"综合"
      },
      {
        name:"销量"
      },
      {
        name:"价格"
      }
    ],
    aIndex:0,
    pagenum:1,
    pagesize:10,
    total:0,
    goods:[]
  },
  
  choose(event){
    const {index} =event.currentTarget.dataset
    this.setData({
      aIndex:index
    })
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getList()
  },
  async getList() {
    const { pagenum, pagesize } = this.data
    const res = await myAxios({
      url: "goods/search",
      data: {
        ...this.options,
        pagenum,
        pagesize
      }
    }).then(res => {
      console.log(res)
      const goodsList = res
      this.setData({
        goodsList,
        goods: [...this.data.goods, ...res.goods],
        total: res.total
      })
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
  onPullDownRefresh() {
    this.setData({
      goods:[],
      pagenum:1
    })
    this.onLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    let {pagenum,total,pagesize}=this.data
    if (pagenum < Math.ceil(total / pagesize)){
        this.setData({
          pagenum:++pagenum
        })
        this.getList()
    }else {
      wx.showToast({
        title: '没有更多内容',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})