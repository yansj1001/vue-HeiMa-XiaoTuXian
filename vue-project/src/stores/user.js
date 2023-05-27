//user相关的数据
import { defineStore } from "pinia";
import {loginAPI} from '@/apis/user'
import {ref} from 'vue'
import { useCartStore } from "./cart";
import { mergeCartAPI } from "@/apis/cart";

export const useUserStore = defineStore('user',()=>{
    //定义数据
    const userInfo = ref({})
    const cartStore = useCartStore()
    //定义action方法
    const getUserInfo = async ({account,password}) => {
        const res = await loginAPI({account,password})
        userInfo.value = res.result
        //登陆时调用合并接口，将本地的购物车数据合并到当前登录的账号中
        await mergeCartAPI(cartStore.cartList.map((item)=>{
            return {
                skuId:item.skuId,
                selected:item.selected,
                count:item.count
            }
        }))
        //获取最新的购物车并覆盖当前数据
        cartStore.updateCart()
    }
    //清除用户信息
    const clearUserInfo = () => {
        userInfo.value = {}
        //执行退出时调用清空购物车的方法
        cartStore.clearCart()
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