import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//此处引入的方法用来检测某一段元素是否进入视口区域
import { useIntersectionObserver } from '@vueuse/core'
//测试接口函数
// import { getCategory } from './apis/testAPI'
// getCategory().then(res=>{
//     console.log(res);
// })

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

app.directive('img-lazy',{
    mounted(el,binding){
        //el是指令绑定的元素
        //binding.value是指令后面的值 此处为url
        useIntersectionObserver(
            el,
            ([{ isIntersecting }]) => {
                if(isIntersecting){
                    el.src = binding.value
                }
            },
          )
    }
})