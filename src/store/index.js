import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
  documentHeight: document.body.clientHeight
};
const getters ={
  heightChange(state){
    return state.documentHeight;
  }
};
const mutations={
  newHeight(state){
    state.documentHeight = document.body.clientHeight;
  }
};
const actions = {
  getHeight(context) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    context.commit('newHeight');
  }
};
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;
