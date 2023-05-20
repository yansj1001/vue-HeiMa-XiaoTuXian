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
            //该方法第一个参数为监测的目标，此处即el
            el,
            //此处的isIntersecting用于返回是否进入视口区域，取值为布尔值
            ([{ isIntersecting }]) => {
                if(isIntersecting){
                    //将绑定的元素的src属性的值设置为其后跟的值，因为这个值在挂载后就会获取，此时只是起到懒加载的作用
                    //在视口没有到达时，通过url请求图片，在视口到达时才会请求
                    el.src = binding.value
                }
            },
          )
    }
})