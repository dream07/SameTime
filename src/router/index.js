
import Vue from 'vue'
import Router from 'vue-router'
import layout from '../views/layout'
import login from '../views/Login'
import index from '../views/Index'
import foodcategory from '../views/foodcategory'
import foodrecord from '../views/foodrecord'
import editfoodrecord from '../views/editfoodrecord'
import addfoodrecord from '../views/addfoodrecord'
import order from '../views/order'
import foodtaste from '../views/foodtaste'
import bestseller from '../views/bestseller'
import businessstatistics from '../views/businessstatistics'
import cashierwater from '../views/cashierwater'
import discountcoupon from '../views/discountcoupon'
import member from '../views/member'
import userConfig from '../views/userConfig'
import tablemanagement from '../views/tablemanagement'
import systemconfig from '../views/systemconfig'
import shoplist from '../views/shoplist'
import specificationconfig from '../views/specificationconfig'
import specialoffer from '../views/specialoffer'
import shopoffer from '../views/shopoffer'
import salesvolume from '../views/salesvolume'
import refoundorder from '../views/refoundorder'
import addpromotion from '../views/addpromotion'
import editpromotion from '../views/editpromotion'
import addtaocan from '../views/addtaocan'
import edittaocan from '../views/edittaocan'
import taocanDetail from '../views/taocanDetail'
import addshop from '../views/addshop'
import editshop from '../views/editshop'
import orderDetail from '../views/orderDetail'
import specificationdetail from '../views/specificationdetail'
import shopDetail from '../views/shopDetail'
import bank from '../views/bank'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 不是必须加载的组件使用懒加载

Vue.use(Router)
let defaultRouter = [
  {
    path: '/',
    redirect: '/login',
    hidden: true,
    children: []
  },
  {
    path: '/login',
    component: login,
    name:'login',
    hidden: true,
    children: []
  },
  {
    path: '/layout',
    component: layout,
    name: 'article',
    // alone: true,
    children: [
      {
        path: '/index',
        component: index,
        name:'主页',
        children: []
      },
      {
        path: '/foodcategory',
        component: foodcategory,
        name:'菜品类别',
        children: []
      },
      {
        path: '/foodrecord',
        component: foodrecord,
        name:'菜品档案',
        children: []
      },
      {
        path: '/editfoodrecord',
        component: editfoodrecord,
        name:'editfoodrecord',
        children: []
      },
      {
        path: '/addfoodrecord',
        component: addfoodrecord,
        name:'addfoodrecord',
        children: []
      },
      {
        path: '/order',
        component: order,
        name:'餐饮订单',
        children: [],
      //   meta:{
      //     // 页面标题title
      //     title: '餐饮订单'
      // }
      },
      {
        path: '/foodtaste',
        component: foodtaste,
        name:'菜品口味',
        children: []
      },
      {
        path: '/bestseller',
        component: bestseller,
        name:'套餐热卖',
        children: []
      },
      {
        path: '/businessstatistics',
        component: businessstatistics,
        name:'营业统计',
        children: []
      },
      {
        path: '/cashierwater',
        component: cashierwater,
        name:'收银流水',
        children: []
      },
      {
        path: '/discountcoupon',
        component: discountcoupon,
        name:'优惠券设置',
        children: []
      },
      {
        path: '/member',
        component: member,
        name:'管理员列表',
        children: []
      },
      {
        path: '/userConfig',
        component: userConfig,
        name:'userConfig',
        children: []
      },
      {
        path: '/tablemanagement',
        component: tablemanagement,
        name:'桌位管理',
        children: []
      },
      {
        path: '/refoundorder',
        component: refoundorder,
        name:'退款订单',
        children: []
      },
      {
        path: '/systemconfig',
        component: systemconfig,
        name:'系统设置',
        children: []
      },
      {
        path: '/shoplist',
        component: shoplist,
        name:'门店列表',
        children: []
      },
      {
        path: '/specificationconfig',
        component: specificationconfig,
        name:'规格管理',
        children: []
      },
      {
        path: '/specialoffer',
        component: specialoffer,
        name:'特价折扣',
        children: []
      },
      {
        path: '/shopoffer',
        component: shopoffer,
        name:'店铺折扣',
        children: []
      },
      {
        path: '/salesvolume',
        component: salesvolume,
        name:'菜品销量',
        children: []
      },{
        path: '/addpromotion',
        component: addpromotion,
        name:'新增促销',
        children: []
      },{
        path: '/editpromotion',
        component: editpromotion,
        name:'修改促销',
        children: []
      },{
        path: '/addtaocan',
        component: addtaocan,
        name:'新增套餐',
        children: []
      },{
        path: '/edittaocan',
        component: edittaocan,
        name:'编辑套餐',
        children: []
      },{
        path: '/taocanDetail',
        component: taocanDetail,
        name:'套餐详情',
        children: []
      },{
        path: '/addshop',
        component: addshop,
        name:'新增店铺',
        children: []
      },{
        path: '/editshop',
        component: editshop,
        name:'修改店铺',
        children: []
      },{
        path: '/orderDetail',
        component: orderDetail,
        name:'订单详情',
        children: []
      },{
        path: '/specificationdetail',
        component: specificationdetail,
        name:'促销详情',
        children: []
      }, {
        path: '/bank',
        component: bank,
        name: '银行卡',
        children: []
    },{
      path: '/shopDetail',
      component: shopDetail,
      name:'店铺详情',
      children: []
    },
    ]
  },

]

let addRouter = [
  
  {
    r_id: 100022,
    path: '/layout',
    component: layout,
    r_name: '标题',
    name: 'article',
    children: [
      {
        path: '/index',
        component: index,
        name:'主页',
        children: []
      },
      {
        r_id: 100023,
        r_name: '类别',
        path: '/foodcategory',
        component: foodcategory,
        name:'菜品类别',
        r_name:'菜品类别',
        children: []
      },
      {
        path: '/foodrecord',
        component: foodrecord,
        name:'菜品档案',
        children: []
      },
      {
        path: '/refoundorder',
        component: refoundorder,
        name:'退款订单',
        children: []
      },
      {
        path: '/editfoodrecord',
        component: editfoodrecord,
        name:'编辑菜品',
        children: []
      },
      {
        path: '/addfoodrecord',
        component: addfoodrecord,
        name:'添加菜品',
        children: []
      },
      {
        path: '/order',
        component: order,
        name:'餐饮订单',
        children: []
      },
      {
        path: '/foodtaste',
        component: foodtaste,
        name:'菜品口味',
        children: []
      },
      {
        path: '/bestseller',
        component: bestseller,
        name:'套餐热卖',
        children: []
      },
      {
        path: '/businessstatistics',
        component: businessstatistics,
        name:'营业统计',
        children: []
      },
      {
        path: '/cashierwater',
        component: cashierwater,
        name:'收银流水',
        children: []
      },
      {
        path: '/discountcoupon',
        component: discountcoupon,
        name:'优惠券设置',
        children: []
      },
      {
        path: '/member',
        component: member,
        name:'管理员列表',
        children: []
      },
      {
        path: '/userConfig',
        component: userConfig,
        name:'',
        children: []
      },
      {
        path: '/tablemanagement',
        component: tablemanagement,
        name:'桌位管理',
        children: []
      },
      {
        path: '/shopDetail',
        component: shopDetail,
        name:'店铺详情',
        children: []
      },
      {
        path: '/systemconfig',
        component: systemconfig,
        name:'系统设置',
        children: []
      },
      {
        path: '/shoplist',
        component: shoplist,
        name:'门店列表',
        children: []
      },
      {
        path: '/specificationconfig',
        component: specificationconfig,
        name:'规格管理',
        children: []
      },
      {
        path: '/specialoffer',
        component: specialoffer,
        name:'特价折扣',
        children: []
      },
      {
        path: '/shopoffer',
        component: shopoffer,
        name:'店铺折扣',
        children: []
      },
      {
        path: '/salesvolume',
        component: salesvolume,
        name:'菜品销量',
        children: []
      },{
        path: '/addpromotion',
        component: addpromotion,
        name:'新增促销',
        children: []
      },{
        path: '/editpromotion',
        component: editpromotion,
        name:'修改促销',
        children: []
      },{
        path: '/addtaocan',
        component: addtaocan,
        name:'新增套餐',
        children: []
      },{
        path: '/edittaocan',
        component: edittaocan,
        name:'编辑套餐',
        children: []
      },{
        path: '/taocanDetail',
        component: taocanDetail,
        name:'套餐详情',
        children: []
      },{
        path: '/addshop',
        component: addshop,
        name:'新增店铺',
        children: []
      },{
        path: '/editshop',
        component: editshop,
        name:'修改店铺',
        children: []
      },{
        path: '/orderDetail',
        component: orderDetail,
        name:'订单详情',
        children: []
      },{
        path: '/specificationdetail',
        component: specificationdetail,
        name:'促销详情',
        children: []
      }, {
        path: '/bank',
        component: bank,
        name: '银行卡',
        children: []
    }
    ]
  }

]
export default new Router({
  mode: 'history',
  routes: defaultRouter
})
export { defaultRouter, addRouter }
