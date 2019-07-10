// 专门处理users用户管理 - 接口方法

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

// 实现用户登录
export const login = (data) => {
  return axios({
    method: 'post',
    url: 'login',
    data
  })
}

// 获取用户列表数据
export const getUserList = (pa) => {
  return axios({
    url: 'users',
    params: pa
  })
}

// 添加用户数据
export const addUser = (data) => {
  return axios({
    url: 'users',
    method: 'post',
    data
  })
}

// 根据用户数据id删除单个用户
// 增加(post)  删除(delete)  修改(put)  查询(get)
export const delUser = (id) => {
  return axios({
    // 请求方法
    method: 'delete',
    // 请求路径
    url: `users/${id}`
  })
}

// 修改用户状态
export const updateUserState = (uid, type) => {
  return axios({
    url: `users/${uid}/state/${type}`,
    method: 'put'
  })
}

// 分配用户角色
export const grantUserRole = (id, rid) => {
  return axios({
    method: 'put',
    url: `users/${id}/role`,
    data: { rid }
  })
}
