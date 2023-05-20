<script setup>
import {onMounted} from 'vue'
import LayoutNav from '@/views/Layout/components/LayoutNav.vue';
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue';
import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue';
import LayoutFixed from '@/views/Layout/components/LayoutFixed.vue';
//引入pinia中关于列表数据的相关配置
import { useCategoryStore } from '@/stores/category';
const categoryStore = useCategoryStore()
//此处调用获取列表的数据的方法
onMounted(()=>{
    categoryStore.getList()
})
</script>
<template>
    <LayoutFixed></LayoutFixed>
    <LayoutNav></LayoutNav>
    <LayoutHeader></LayoutHeader>
    <!-- 二级路由出口 -->
    <!-- 给路由出口添加一个key值，用来破坏组件复用机制 -->
    <!-- 使用这种方法会出现重复发送请求 -->
    <!-- <RouterView :key="$route.fullPath" /> -->
    <RouterView />
    <LayoutFooter></LayoutFooter>
</template>