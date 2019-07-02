import Vue from 'vue'
import VueRouter from 'vue-router'

//引入路由所对应的组件
//@ - 相当于src目录
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

//创建路由对象
var router =new VueRouter({
    routes:[
        {
            name:'login',
            path:'/login',
            component:Login
        },
    ]
})

export default router