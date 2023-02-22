import { login, getUserInfo } from '@/api/user'
import { getItem, removeAllItem, setItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'
// import md5 from 'md5'
export default {
  namespaced: true, // 单独模块 不会合并
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token) // token本地储存
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    /**
     * 登录请求
     */
    login(context, userInfo) {
      // console.log(context)
      const { email, password } = userInfo
      // console.log(email, password)
      return new Promise((resolve, reject) => {
        login({
          email,
          // password: md5(password) // 密码需要加密 这个这边存储
          password
        })
          .then((data) => {
            // console.log('=============', data.access_token)
            // 保存登录时间
            setTimeStamp()
            this.commit('user/setToken', data.access_token)
            resolve()
          })
          .catch((error) => {
            // console.error(error)
            reject(error)
          })
      })
    },
    /**
     * 用户信息
     */
    async getUserInfo() {
      try {
        const response = await getUserInfo()
        this.commit('user/setUserInfo', response)
        // console.log(JSON.stringify(response) + 'response')
        return response
      } catch (error) {
        // console.log(error)
      }
    },
    /**
     * 退出登录
     */
    logout() {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      router.push('/login')
    }
  }
}
