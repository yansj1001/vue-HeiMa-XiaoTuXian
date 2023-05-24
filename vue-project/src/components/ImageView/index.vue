<script setup>
import {ref,watch} from 'vue'
import {useMouseInElement, watchArray} from '@vueuse/core'
// 图片列表
defineProps({
    imageList:{
        type:Array,
        default:()=>[]
    }
})

// const imageList = [
//   "https://yanxuan-item.nosdn.127.net/d917c92e663c5ed0bb577c7ded73e4ec.png",
//   "https://yanxuan-item.nosdn.127.net/e801b9572f0b0c02a52952b01adab967.jpg",
//   "https://yanxuan-item.nosdn.127.net/b52c447ad472d51adbdde1a83f550ac2.jpg",
//   "https://yanxuan-item.nosdn.127.net/f93243224dc37674dfca5874fe089c60.jpg",
//   "https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg"
// ]
//创建索引，用于大图显示取值
const activeIndex = ref(0)
//鼠标移入的函数，将当前li标签的索引值作为图片列表的索引值来显示图片
const activeHandler = (i)=>{
    activeIndex.value = i
}
//获取元素实例
const target = ref(null)
//获取鼠标在盒子中的坐标,注意此处结构的属性也属于ref对象，需要通过.value来访问值
const {elementX,elementY,isOutside} = useMouseInElement(target)
//定义滑块的偏移量变量
const left = ref(0)
const top = ref(0)
//定义大图的背景偏移量，因为大图显示使用的背景图片，盒子的大小相同，背景图片的尺寸为小图的二倍，通过调整背景图片的偏移量来调整显示的部分
const positionX = ref(0)
const positionY = ref(0)
//使用watch监听下x,y的变化，如果发生变化则执行如下操作
watch([elementX,elementY,isOutside],()=>{
    //优化性能，只有鼠标在目标区域内移动才执行下边的逻辑,下面代码通过isOutside来进行判断，当值为true时，表示鼠标在目标区域外，直接return结束函数
    if(isOutside.value) return 
    console.log(11);
    //滑块会跟随鼠标移动的范围
    //横向
    if(elementX.value > 100 && elementX.value < 300){
        left.value = elementX.value - 100
    }
    //纵向
    if(elementY.value > 100 && elementY.value < 300){
        top.value = elementY.value - 100
    }
    //超出上述范围后滑块会被停止在边缘不再继续跟随
    if(elementX.value < 100){left.value = 0}
    if(elementX.value > 300){left.value = 200}
    if(elementY.value < 100){top.value = 0}
    if(elementY.value > 300){top.value = 200}
    //此处为大图显示时，其背景偏移量的修改,大图移动与滑块移动方向相反，移动距离为滑块的2倍
    positionX.value = -left.value * 2
    positionY.value = -top.value * 2 

})
</script>


<template>
  <div class="goods-image">
    <!-- 左侧大图,ref="target"为获取该元素-->
    <div class="middle" ref="target">
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 蒙层小滑块 -->
      <div class="layer" :style="{ left: `${left}px`, top: `${top}px` }"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
        <!-- mouseenter为鼠标移入事件，使用:class可以动态设置类，active类名的条件为li标签的索引与图片列表的索引相同 -->
      <li v-for="(img, i) in imageList" :key="i" @mouseenter="activeHandler(i)" :class="{active:i === activeIndex}">
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div class="large" :style="[
      {
        backgroundImage: `url(${imageList[activeIndex]})`,
        backgroundPositionX: `${positionX}px`,
        backgroundPositionY: `${positionY}px`,
      },
    ]" v-show="!isOutside"></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>