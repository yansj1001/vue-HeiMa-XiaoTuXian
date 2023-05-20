<script setup>
const props = defineProps({
    tittle:{
        type:String,
        default:''
    },
    subTittle:{
        type:String,
        default:''
    }
})
</script>
<template>
    <div class="home-panel">
        <div class="container">
            <div class="head">
                <h3>{{ tittle }}<small>{{ subTittle }}</small></h3>
            </div>
            <!-- 使用插槽传入主体 -->
            <!-- 当只有一个插槽时，可不使用name属性指定插入 -->
            <slot name="main"></slot>
        </div>
    </div>
</template>
<style scoped lang="scss">
.home-panel{
    background-color: #fff;
    .head{
        padding: 40px 0;
        display: flex;
        align-items: flex-end;
        h3{
            flex: 1;
            font-size: 32px;
            font-weight: normal;
            margin-left: 6px;
            height: 35px;
            line-height: 35px;
            small{
                font-size: 16px;
                color: #999;
                margin-left: 20px;
            }
        }
    }
}
</style>