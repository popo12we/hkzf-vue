import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
// 引入字体图标JS
import './assets/fonts/iconfont.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:8080'
// 配置axios的响应拦截器
axios.interceptors.response.use(function (res) {
  return res.data
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
