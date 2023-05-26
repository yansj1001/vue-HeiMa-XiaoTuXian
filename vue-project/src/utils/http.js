import { useUserStore } from "@/stores/user";
import axios from "axios";
import { ElMessage } from 'element-plus'
import router from "@/router";
import 'element-plus/theme-chalk/el-message.css'
//创建axios实例
const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  //配置请求拦截器携带token，在请求之前执行,进行访问控制
  //获取用户的信息实例
  const userStore = useUserStore()
  //获取token
  const token = userStore.userInfo.token
  //此处判断是否有token
  if(token){
    //此处在请求头中携带token,具体格式需要协商
    config.headers.Authorization=`Bearer ${token}`
  }
    return config
  }, e => Promise.reject(e))
  
  // axios响应式拦截器
  httpInstance.interceptors.response.use(res => res.data, e => {
    ElMessage({
      type:'warning',
      message:e.response.data.message
    })
    //配置响应码为401时token失效的相关操作
    //获取pinia的实例，用来使用其中的方法
    const userStore = useUserStore()
    //判断状态码是否为401
    if(e.response.status === 401){
      //状态码为401时，代表token失效，此时需要将用户数据清除并跳转至登录页
      //清除用户数据
      userStore.clearUserInfo()
      //跳转至登录页
      router.push('/login')
    }
    return Promise.reject(e)
  })

  export default httpInstance