<script setup>
//此处会出现重复请求，待优化
// //引入获取列表数据的方法
// import { getCategoryAPI } from '@/apis/layout';
// import { onMounted , ref} from 'vue';
// //定义一个空的响应式数组数据用于存放列表数据
// const categoryList = ref([])
// //调用获取列表数据的方法，使用函数包装再后续进行数据处理时更加方便
// //因为获取列表数据的方法的返回值是一个promise，所以使用async修饰
// const getList = async () => {
//     const res = await getCategoryAPI()
//     categoryList.value = res.result
// }
// //在组件挂载后就调用获取列表数据方法
// onMounted(()=>{
//     getList()
// })
//此处优化重复请求，使用pinia管理数据，调用方法使用根组件调用，子组件使用其中的数据，请求只会发生一次
import { useCategoryStore } from '@/stores/category';
import HeaderCart from './HeaderCart.vue';
//由于获取数据的方法在根组件中调用了，所以此处获取实例对象后可直接使用数据
const categoryStore = useCategoryStore()
console.log(categoryStore.categoryList);
</script>

<template>
    <header class="app-header">
        <div class="container">
           <h1 class="logo">
            <RouterLink to="/">小兔鲜</RouterLink>
           </h1>
           <!-- 列表渲染 -->
            <ul class="app-header-nav">
                <!-- 使用v-for遍历渲染 -->
                <li class="home"><RouterLink to="/">首页</RouterLink></li>
                <li v-for="item of categoryStore.categoryList" :key="item.id"><RouterLink active-class="active" :to="`/category/${item.id}`">{{ item.name }}</RouterLink></li>
            </ul>
            <div class="search">
                <!-- i标签用来防止文本图标 -->
                <i class="iconfont icon-search"></i>
                <input type="text" placeholder="搜一搜">
            </div>
            <!-- 头部购物车 -->
            <HeaderCart />
        </div>
    </header>
</template>
使用scss标准编写样式
<style scoped lang="scss">
.app-header{
    background-color: #fff;
    .container{
        display: flex;
        align-items: center;
    }
    .logo{
        width: 200px;
        a{
            display: block;
            text-indent: -9999px;
            width: 100%;
            height: 132px;
            background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
        }
    }
    .app-header-nav{
        width: 820px;
        display: flex;
        position: relative;
        padding-left: 40px;
        z-index: 998;
        li{
            margin-left: 40px;
            width: 38px;
            text-align: center;
            a{
                display: inline-block;
                font-size: 16px;
                height: 32px;
                line-height: 32px;
            }
            a:hover{
                color: $xtxColor;
                border-bottom: 1px solid $xtxColor;
            }
            .active{
                color: $xtxColor;
                border-bottom: 1px solid $xtxColor;
            }
        }
    }
    .search{
        width: 170px;
        height: 32px;
        position: relative;
        border-bottom: 1px solid #e7e7e7;
        line-height: 32px;
        .icon-search{
            font-size: 18px;
            margin-left: 5px;
        }
        input{
            width: 140px;
            margin-left: 5px;
            color: #666;
        }
    }
}
</style>