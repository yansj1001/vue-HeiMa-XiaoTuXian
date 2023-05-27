//购物车相关数据与方法
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './user'
import { insertCartAPI, getNewCartAPI ,delCartAPI} from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    //定义购物车列表
    const cartList = ref([])
    //定义相关方法
    //获取最新购物车数据
    const updateCart = async () => {
        //调用获取最新购物车接口并进行覆盖
        const res = await getNewCartAPI()
        cartList.value = res.result
    }
    //添加
    const addCart = async (goods) => {
        if (isLogin.value) {
            const { skuId, count } = goods
            //调用加入购物车列表
            await insertCartAPI({ skuId, count })
            updateCart()
        } else {
            //需要判断商品是否已经在购物车中，如果在则将商品数量加一，不在则直接添加
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {
                item.count++
            } else {
                cartList.value.push(goods)
            }
        }

    }
    //删除
    const delCart = async (skuId) => {
        if (isLogin.value) {
            //当为登录状态时，删除调用删除接口
            await delCartAPI([skuId])
            //删除后调用接口获取最新的数据
            const res = await getNewCartAPI()
            //对原来的购物车列表进行覆盖
            cartList.value = res.result
        } else {
            //1、使用splice
            const index = cartList.value.findIndex((item) => skuId === item.skuId)
            cartList.value.splice(index, 1)
            //2、使用filter
            // cartList.value = cartList.value.filter((item)=> skuId !== item.skuId)
        }

    }
    //退出清空购物车
    const clearCart = () => {
        cartList.value = []
    }
    //计算属性，计算商品总数以及总价
    const allCount = computed(() => {
        return cartList.value.reduce((a, b) => a + b.count, 0)
    })
    const allPrice = computed(() => {
        return cartList.value.reduce((a, b) => a + b.count * b.price, 0)
    })
    //控制全选按钮
    const isAll = computed(() => {
        return cartList.value.every((item) => item.selected)
    })
    //选中商品的数量
    const checkCount = computed(() => {
        return cartList.value.filter((item) => item.selected).reduce((a, b) => a + b.count, 0)
    })
    //选中商品的价格
    const checkPrice = computed(() => {
        return cartList.value.filter((item) => item.selected).reduce((a, b) => a + b.count * b.price, 0)
    })
    //单选时对商品的selected的状态进行修改
    const singleCheck = (skuId, selected) => {
        //根据skuId对商品数组进行查找，找出需要修改选中状态的商品
        const item = cartList.value.find((item) => skuId === item.skuId)
        //修改选中状态
        item.selected = selected

    }
    //全选按钮被选中的时候修改所有购物车内商品的选中状态
    const allCheck = (selected) => {
        cartList.value.forEach((item) => { item.selected = selected })
    }
    return {
        cartList,
        allCount,
        allPrice,
        isAll,
        checkCount,
        checkPrice,
        clearCart,
        addCart,
        delCart,
        singleCheck,
        allCheck,
        updateCart
    }
},
    {
        persist: true
    })