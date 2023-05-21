//createRouter,用于创建router实例对象；createWebHistory用于创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'

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
