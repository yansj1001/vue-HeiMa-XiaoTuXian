import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
//配置element-plus自动按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //配置element-plus自动按需导入
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      //resolvers: [ElementPlusResolver()],
      resolvers: [
        //配置element-plus采用sass样式配色系统
        ElementPlusResolver({ importStyle: "sass" })
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
        `,
      }
    }
  }
})
