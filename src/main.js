import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import TimeFilter from './assets/js/timeFilter'
import dateFilter from './assets/js/dateFilter'
import imgUrl from './assets/js/imgUrl'

Vue.use(VueMaterial)
Vue.filter('timefilter',TimeFilter)
Vue.filter('datefilter',dateFilter)
Vue.filter('imgurl',imgUrl)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
