// 专门处理role角色管理 - 接口方法

// 引入
import axios from 'axios'

// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么?手动传递token
  // 1.获取token
  var token = localStorage.getItem('heima_manager_token')
  if (token) {
    // 2.必须在请求头中使用 Authorization 字段提供 token 令牌
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export const getAllRoleLlist = () => {
  return axios({
    url: 'roles'
  })
}
