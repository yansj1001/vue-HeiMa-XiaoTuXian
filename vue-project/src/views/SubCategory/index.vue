<script setup>
import { getCategoryFilterAPI,getSubCategoryAPI } from '@/apis/category';
import { useRoute } from 'vue-router';
import {ref,onMounted} from 'vue'
import GoodItem from '../Home/components/GoodItem.vue';
//获取useRoute实例
const route = useRoute()
const categoryData = ref({})
const getCategoryData = async ()=>{
    const res =  await getCategoryFilterAPI(route.params.id)
    categoryData.value = res.result
}
onMounted(()=>{
    getCategoryData()
})
//分类商品数据
const categorySub = ref([])
//接口所需要的参数
const reqData = ref({
    categoryId:route.params.id,
    page:1,
    pageSize:20,
    sortField:'publishTime'
})
//调用接口的函数
const getSubCategory = async ()=>{
    const res = await getSubCategoryAPI(reqData.value)
    categorySub.value = res.result.items
}
onMounted(()=>{
    getSubCategory()
})
const tabChange = ()=>{
  reqData.value.page = 1
  getSubCategory()
}
//无限加载商品列表
const disabled = ref(false)
const load = async ()=>{
  reqData.value.page++
  const res = await getSubCategoryAPI(reqData.value)
  categorySub.value = [...categorySub.value,...res.result.items]
  if(res.result.items.length === 0){
    disabled.value = true
  }
}
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
         <GoodItem v-for="goods in categorySub" :key="goods.id" :goods="goods"/>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>