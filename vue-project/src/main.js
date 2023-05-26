import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//引入懒加载插件
import { lazyPlugin } from './directives'
//引入图片放大镜以及SKU组件
import { componentPlugin } from './components'
//pinia数据持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
//测试接口函数
// import { getCategory } from './apis/testAPI'
// getCategory().then(res=>{
//     console.log(res);
// })

const app = createApp(App)
const pinia = createPinia()
//注册pinia持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')

