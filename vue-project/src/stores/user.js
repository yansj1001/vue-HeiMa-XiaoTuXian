//user相关的数据
import { defineStore } from "pinia";
import {loginAPI} from '@/apis/user'
import {ref} from 'vue'

export const useUserStore = defineStore('user',()=>{
    //定义数据
    const userInfo = ref({})
    //定义action方法
    const getUserInfo = async ({account,password}) => {
        const res = await loginAPI({account,password})
        userInfo.value = res.result
    }
    //清除用户信息
    const clearUserInfo = () => {
        userInfo.value = {}
    }
    //将数据与方法return 出去
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},{
    persist:true
})