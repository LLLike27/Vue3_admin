import request from '@/utils/request'
// 登录接口
export function login(data) {
  return request({
    url: '/auth/login',
    method: 'POST',
    data
  })
}
// 用户接口
export function getUserInfo() {
  return request({
    url: '/admin/user',
    method: 'GET'
  })
}
// 退出登录接口
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'POST'
  })
}
