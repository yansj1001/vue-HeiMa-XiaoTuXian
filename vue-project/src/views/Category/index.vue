<script setup>
import { getCateAPI } from '@/apis/category'
import { getBannerAPI } from '@/apis/home'
//使用该方法可以在组件中获取路由参数
import { useRoute,onBeforeRouteUpdate } from "vue-router"
import { onMounted, ref } from 'vue'
import GoodItem from '../Home/components/GoodItem.vue'
//获取图片
const bannerList = ref([])
const getBannerList = async () => {
  const res = await getBannerAPI({
    distributionSite: 2
  })
  bannerList.value = res.result
}
//获取分类
const categoryData = ref({})
//创建route实例，用于访问数据
const route = useRoute()
//此处设置默认参数，如果没有传参则使用默认参数，传递参数则使用传入的参数
const getCategory = async (id = route.params.id) => {
  const res = await getCateAPI(id)
  categoryData.value = res.result
  console.log(categoryData.value.children);
}
onMounted(() => {
  getCategory()
  getBannerList()
})
//使用onBeforeRouteUpdate钩子函数监听路由的变化，该方法可以减少不必要的请求发送，比如轮播图资源的请求
//回调函数中传入参数to，该参数为目标路由的相关信息，用于获取最新的路由Id
onBeforeRouteUpdate((to)=>{
  console.log(11)
  //调用函数时传入参数，就会使用参数
  getCategory(to.params.id)
})
</script>
<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="home-banner">
        <!-- 此处使用的是第三方组件库中的轮播图组件，外层的el-carousel标签为外部容器 -->
        <!-- 内层的el-carousel-item标签为每一张图片的容器 -->
        <el-carousel height="500px">
          <el-carousel-item v-for="item in bannerList" :key="item">
            <img :src="item.imgUrl" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in categoryData.children" :key="i.id">
            <RouterLink to="/">
              <img :src="i.picture" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <GoodItem v-for="good in item.goods" :goods="good" :key="good.id" />
        </div>
      </div>
    </div>
  </div>
</template>
  
  
<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}

.home-banner {
  width: 1240px;
  height: 500px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>