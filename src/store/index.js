import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const state = {
  admin: JSON.parse(sessionStorage.getItem("admin")) || "",
  schoolId: JSON.parse(sessionStorage.getItem("schoolId")) || "",
};
// const getters = {
//   login(state) {
//     return state.admin;
//   }
// };
const mutations = {
  login(state, obj) {
    sessionStorage.setItem("admin", JSON.stringify(obj));
    state.admin = obj;
  },
  outLogin(state) {
    sessionStorage.removeItem("admin");
    state.admin = "";
  },
  school(state, obj){
    sessionStorage.setItem("admin", JSON.stringify(obj));
    state.schoolId = obj;
  }
};
const actions = {
  login(context, obj) {
    context.commit('login', obj);
  },
  outLogin(context) {
    context.commit('outLogin');
  },
  school(context, obj){
    context.commit('school', obj);
  }
};
const store = new Vuex.Store({
  state,
  // getters,
  mutations,
  actions
});

export default store;
