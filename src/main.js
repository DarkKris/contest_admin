import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import router from "router/index";
import store from "store/index";
import App from "./App";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ElementUI);

new Vue({
  render: (c) => c(App),
  router,
  store: new Vuex.Store(store)
}).$mount('#app');