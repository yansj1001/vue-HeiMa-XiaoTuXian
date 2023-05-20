//封装分类数据相关业务逻辑
import { getCateAPI } from '@/apis/category'
import { useRoute,onBeforeRouteUpdate } from "vue-router"
import { onMounted, ref } from 'vue'
export function useCategory(){
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
  })
  //使用onBeforeRouteUpdate钩子函数监听路由的变化，该方法可以减少不必要的请求发送，比如轮播图资源的请求
//回调函数中传入参数to，该参数为目标路由的相关信息，用于获取最新的路由Id
onBeforeRouteUpdate((to)=>{
    console.log(11)
    //调用函数时传入参数，就会使用参数
    getCategory(to.params.id)
  })
  return {
    categoryData
  }
}