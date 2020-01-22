import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/pages/Home'),
    redirect: '/home/index',
    children: [
      {
        path: '/home/index',
        component: () => import('@/pages/Index')
      },
      {
        path: '/home/findhouse',
        component: () => import('@/pages/FindHouse')
      }

    ]
  },
  {
    path: '/map',
    component: () => import('@/pages/Map')
  },
  {
    path: '/list',
    component: () => import('@/pages/List')
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // 当前路由的类名
  linkActiveClass: 'active'
})

export default router
