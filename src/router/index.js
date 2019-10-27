import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Coupon from '@/components/Coupon'
import User from '@/components/User'
import Error from '@/components/404'
import Driver from '@/components/Driver'
import Order from '@/components/Order'
import Payapplication from '@/components/Payapplication'
import Article from '@/components/Article'
import PriceStandard from '@/components/PriceStandard'
import PlatformInformation from '@/components/PlatformInformation'
// 校查查
import SchoolList from '@/components/SchoolList'
import QuestionList from '@/components/QuestionList'
import Banner from '@/components/Banner'
import Administrator from '@/components/Administrator'
import News from '@/components/News'
import SchoolDetail from '@/components/SchoolDetail'

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'Error',
    component: Error,
  },
  {
    path: '/Index',
    component: Index,
    children: [
      {
        path: '/',
        name: 'User',
        component: User
      }, {
        path: '/Coupon',
        name: 'Coupon',
        component: Coupon
      }, {
        path: '/Driver',
        name: 'Driver',
        component: Driver
      }, {
        path: '/Banner',
        name: 'Banner',
        component: Banner
      }, {
        path: '/Order',
        name: 'Order',
        component: Order
      }, {
        path: '/Payapplication',
        name: 'Payapplication',
        component: Payapplication
      }, {
        path: '/Article',
        name: 'Article',
        component: Article
      }, {
        path: '/PlatformInformation',
        name: 'PlatformInformation',
        component: PlatformInformation
      }, {
        path: '/PriceStandard',
        name: 'PriceStandard',
        component: PriceStandard
      }, {
        path: '/SchoolList',
        name: 'SchoolList',
        component: SchoolList
      }, {
        path: '/QuestionList',
        name: 'QuestionList',
        component: QuestionList
      }, {
        path: '/Administrator',
        name: 'Administrator',
        component: Administrator
      }, {
        path: '/News',
        name: 'News',
        component: News
      }, {
        path: '/SchoolDetail',
        name: 'SchoolDetail',
        component: SchoolDetail
      }
    ]
  }
];
export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production',
})

