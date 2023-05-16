import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'

export const useCategoryStore = defineStore('category', () => {
    const categoryList = ref([])
    //调用获取列表数据的方法，使用函数包装再后续进行数据处理时更加方便
    //因为获取列表数据的方法的返回值是一个promise，所以使用async修饰
    const getList = async () => {
        const res = await getCategoryAPI()
        categoryList.value = res.result
    }
    return {
        categoryList,
        getList
    }
})