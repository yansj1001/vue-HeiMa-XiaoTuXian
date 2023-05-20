//封装banner轮播如相关业务逻辑
import { getBannerAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'
//获取图片
export function useBanner() {
    const bannerList = ref([])
    const getBannerList = async () => {
        const res = await getBannerAPI({
            distributionSite: 2
        })
        bannerList.value = res.result
    }
    onMounted(() => {
        getBannerList()
    })
    return {
        bannerList
    }
}