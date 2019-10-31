import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Error from '@/components/404'
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
        name: 'SchoolList',
        component: SchoolList
      }, {
        path: '/Banner',
        name: 'Banner',
        component: Banner
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

