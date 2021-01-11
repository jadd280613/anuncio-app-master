import Vue from 'vue'
import axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import VModal from 'vue-js-modal'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

Vue.use(VModal)
Vue.use(BootstrapVue)
Vue.use(VueRouter, router)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

axios.defaults.baseURL = process.env.VUE_APP_URL;
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
//axios.defaults.headers.common = {
//  "X-CSRFToken": store.state.estado.jwt,
//};

Vue.filter('formatSize', function (size) {
  if (size > 1024 * 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB'
  } else if (size > 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
  } else if (size > 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + ' MB'
  } else if (size > 1024) {
    return (size / 1024).toFixed(2) + ' KB'
  }
  return size.toString() + ' B'
})

Vue.filter('toLocale', function (to) {
  return '/' + to
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
