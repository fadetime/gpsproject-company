import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import HistoryPage from './views/History.vue'
import Info from './views/Info.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component:Login
    },
    {
      path: '/history',
      name: 'history',
      component:HistoryPage
    },
    {
      path: '/info',
      name: 'info',
      component:Info
    }
  ]
})
