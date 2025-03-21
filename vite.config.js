import { fileURLToPath, URL } from 'node:url'
import getPluginsList from "./build/plugins";
import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
export default defineConfig({
  base: './',
  plugins: getPluginsList(),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // 构建配置
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "js/[name].[hash].js",
        chunkFileNames: "js/[name].[hash].js",

      },
    },
  },
  css: {
    postcss: {
      // 这里可以添加其他 PostCSS 配置
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['last 2 versions', 'ie >= 10']
        }),
        cssnano()
      ]
    }
  }
})
