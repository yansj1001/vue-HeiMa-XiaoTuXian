<script setup>
import HomePanel from './HomePanel.vue';
import { getNewAPI } from '@/apis/home';
import {onMounted,ref} from 'vue'
//常规调用接口获取数据
const newList = ref([])
const getNewList = async () => {
    const res = await getNewAPI()
    newList.value = res.result
}
onMounted(()=>{
    getNewList()
})
</script>
<template>
    <HomePanel tittle="新鲜好物" sub-tittle="新鲜出炉 品质靠谱">
        <template #main>
            <ul class="goods-list">
                <li v-for="item in newList" :key="item.id">
                    <RouterLink :to="`/detail/${item.id}`">
                        <img :src="item.picture" alt="">
                        <p class="name">{{ item.name }}</p>
                        <p class="price">{{ item.price }}</p>
                    </RouterLink>
                </li>
            </ul>
        </template>
    </HomePanel>
</template>
<style scoped lang="scss">
.goods-list {
    display: flex;
    justify-content: space-between;
    height: 406px;

    li {
        width: 306px;
        height: 406px;
        background-color: #f0f9f4;
        transition: all .5s;

        &:hover {
            transform: translate3d(0, -6px, 0);
            box-shadow: 0 3px 8px rgb(0 0  0 / 20%);
        }

        img {
            width: 306px;
            height: 306px;
        }

        p {
            font-size: 22px;
            padding-top: 12px;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .price {
            color: $priceColor;
        }
    }
}</style>
