// 定义懒加载插件，此处引入的方法用来检测某一段元素是否进入视口区域
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install (app) {
    // 懒加载指令逻辑
    app.directive('img-lazy', {
      mounted (el, binding) {
        // el: 指令绑定的那个元素 img
        // binding: binding.value  指令等于号后面绑定的表达式的值  图片url
        // 通过解构赋值的方式获取该函数返回的stop方法，该方法可以结束监听
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            if (isIntersecting) {
              // 进入视口区域
              el.src = binding.value
              // 赋值后结束监听
              stop()
            }
          },
        )
      }
    })
  }
}