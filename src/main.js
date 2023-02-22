import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import installIcons from '@/icons/index'
// 导入全局样式
import './styles/index.scss'
// 导入权限控制模块
import './permission'

const app = createApp(App)
app.use(installElementPlus)
app.use(installIcons).use(store).use(router).mount('#app')
