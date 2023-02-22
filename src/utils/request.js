import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { removeAllItem } from './storage'
import { TOKEN } from '@/constant/index'
import { isCheckTimeout } from './auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // config 接口请求的配置信息
    // 在这个位置需要统一的去注入token 如果token存在 注入token 添加到请求头参数中
    if (store.getters.token) {
      // console.log(localStorage.getItem('token') + '-------------')
      // console.log(store.getters.token + '===========2')
      // 主动介入 登出操作
      if (isCheckTimeout()) {
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效'))
      }

      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config // 必须返回配置
  },
  (error) => {
    // 报错的是定义前置拦截器时候抛出一个错误信息
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // console.log(response)
    return response.data
  },
  (error) => {
    const { response } = error
    // 报错的是定义前置拦截器时候抛出一个报错信息
    switch (response.status) {
      case 401:
        ElMessage.error('登陆失败，请重新登录')
        removeAllItem(TOKEN)
        setTimeout(() => {
          window.location.href = '/login'
        }, 500)
        break
      case 404:
        ElMessage.error('接口不存在')
        break
      case 500:
      case 502:
        ElMessage.error('网络异常')
        break
      case 422: {
        const msg =
          response.data.errors[Object.keys(response.data.errors)[0]][0]
        ElMessage.error(msg)
        break
      }
    }

    /*     // 被动处理 token过期问题 单点登录
    具体看服务器返回的有没有特定的状态码 设定
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // token超时
      store.dispatch('user/logout')
    } */

    // 报错的时候抛出一个报错信息
    ElMessage.error(error) // 提示错误信息
    return Promise.reject(error)
  }
)
export default service
