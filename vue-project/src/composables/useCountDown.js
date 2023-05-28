import {computed, onUnmounted, ref} from 'vue'
import  dayjs  from 'dayjs'
//计时器
export const useCountDown = () => {
    //当前时间
    const time = ref(0)
    let timer = null
    //修改时间格式为 xx分xx秒  
    const formatTime = computed(()=>dayjs.unix(time.value).format('mm分ss秒'))
    console.log(formatTime);
    //计时开始函数，根据传入时间每过一秒数值减一
    const start = (currrentTime) => {
        time.value = currrentTime
        timer = setInterval(() => {
            time.value--
        }, 1000);
    }
    onUnmounted(()=>{
        timer && clearInterval(timer)
    })
    return {
        formatTime,
        start
    }
}