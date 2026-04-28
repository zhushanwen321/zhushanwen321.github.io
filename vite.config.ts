import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { cpSync } from 'node:fs'

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'copy-404',
      closeBundle() {
        cpSync('dist/index.html', 'dist/404.html')
      },
    },
  ],
  base: '/',
})
