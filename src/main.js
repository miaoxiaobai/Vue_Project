import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router/router.js'
// 引入element-ui
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入样式文件
import '@/styles/index.less'
// 使用element-ui
Vue.use(ElementUi)

Vue.config.productionTip = false

// 添加路由的导航守卫
router.beforeEach((to, from, next) => {
  // 获取token
  var token = localStorage.getItem('heima_manager_token')
  // 如果没有token值，除非你去登录，否则都应该重定向到登录
  if (token || to.path === '/login') {
    next()
  } else if (!token && to.path !== '/login') {
    // 如果有token，那么就next
    next({ name: 'login' })
  }
})

new Vue({
  // 路由注入
  router,
  render: h => h(App)
}).$mount('#app')
