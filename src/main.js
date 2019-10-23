// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import axios from 'axios'
import http from './assets/http/http'
import VueQuillEditor from 'vue-quill-editor'
import moment from 'moment'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {Loading, Message} from 'element-ui';

Vue.prototype.$axios = axios;
Vue.prototype.http = http;
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueQuillEditor);

// 判断用户是否登录，没有则跳转到登录界面
router.beforeEach((to, from, next) => {
  if (store.state.admin === "" && to.path !== '/Login' && to.path !== '/') {
    Message.info("请登录!");
    next('/');
  } else {
    next();
  }
});

// 接口请求拦截添加loading
let loadingInstance;
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  loadingInstance = Loading.service();
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  loadingInstance.close();
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
