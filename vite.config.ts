import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// 引入等比适配插件
// import px2rem from 'postcss-px2rem'

// 配置基本大小
// const postcss = px2rem({
//     // 基准大小 baseSize，需要和rem.js中相同
//     remUnit: 16
// })

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  // css: {
  //   postcss: {
  //     plugins: [postcss]
  //   }
  // },
})
