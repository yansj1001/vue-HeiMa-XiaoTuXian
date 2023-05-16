<script setup>
import { getBannerAPI } from '@/apis/home';
import {onMounted,ref} from 'vue'
const bannerList = ref([])
const getBannerList = async () => {
    const res = await getBannerAPI()
    bannerList.value = res.result
}
onMounted(()=>{
    getBannerList()
})
</script>
<template>
    <div class="home-banner">
    <!-- 此处使用的是第三方组件库中的轮播图组件，外层的el-carousel标签为外部容器 -->
    <!-- 内层的el-carousel-item标签为每一张图片的容器 -->
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<style scoped lang="scss">
.home-banner{
    width: 1240px;
    height: 500px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 98;
    img{
        width: 100%;
        height: 500px;
    }
}
</style>