import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入路由所对应的组件
// @ - 相当于src目录
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Welcome from '@/views/welcome.vue'
import Users from '@/views/users/index.vue'

Vue.use(VueRouter)

// 创建路由对象
var router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: { name: 'home' }
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      // 重定向
      redirect: { path: '/home/wel' },
      // 嵌套路由 - - 对应着Home组件中的router-view
      children: [
        {
          // 嵌套路由不用添加/，否则会破坏嵌套层次结构
          path: 'wel',
          component: Welcome
        },
        {
          name: 'Users',
          path: 'users',
          component: Users
        }
      ]
    }
  ]
})

export default router
