import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router/router.js'
//引入element-ui
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入样式文件
import '@/styles/index.less'
//使用element-ui
Vue.use(ElementUi)

Vue.config.productionTip = false

new Vue({
  //路由注入
  router,
  render: h => h(App)
}).$mount('#app')
