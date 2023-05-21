import httpInstance from "@/utils/http";
/**
 * @description: 获取一级分类列表数据
 * @param {*} id 分类id 
 * @return {*}
 */
export function getCateAPI(id){
    return httpInstance({
        url:'/category',
        params:{
            id
        }
    })
}
/**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id 
 * @return {*}
 */

export const getCategoryFilterAPI = (id) => {
    return httpInstance({
      url:'/category/sub/filter',
      params:{
        id
      }
    })
  }
  /**
 * @description: 获取导航数据
 * @data { 
     categoryId: 1005000 ,  分类id，route.params.id
     page: 1,  页数  默认为1
     pageSize: 20,   每页条数
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'  筛选
   } 
 * @return {*}
 */
export const getSubCategoryAPI = (data) => {
    return httpInstance({
      url:'/category/goods/temporary',
      method:'POST',
      data
    })
  }
  