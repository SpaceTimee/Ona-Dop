import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [vue(), vueJsx(), vuetify()],
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import url('./src/assets/global');`
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
