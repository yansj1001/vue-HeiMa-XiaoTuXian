//createRouter,用于创建router实例对象；createWebHistory用于创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      //根目录，一级路由
      path:'/',
      component: Layout,
      children:[
        //主页路由
        {
          path:'',
          component: Home
        },
        //分类路由
        {
          path:'category/:id',
          component: Category
        },
        //二级分类路由
        {
          path:'category/sub/:id',
          component:SubCategory
        },
        {
          path:'/detail/:id',
          component:Detail
        },
        {
          path:'cartlist',
          component:CartList
        },
        {
          path:'checkout',
          component:Checkout
        },
        {
          path:'pay',
          component:Pay
        },
        {
          path: 'paycallback', // 注意路径，必须是paycallback
          component: PayBack
        },
        {
          path:'member',
          component:Member,
          children:[
            {
              path:'',
              component:UserInfo
            },
            {
              path:'order',
              component:UserOrder
            }
          ]
        }
      ]
    },
    //登录路由
    {
      path:'/login',
      component: Login
    }
  ],
  scrollBehavior(){
    return {
      top:0
    }
  }
})

export default router
