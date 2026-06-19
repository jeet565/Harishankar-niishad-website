import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './', // Ensures assets use relative paths so it works by just double-clicking index.html
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
      },
    },
  },
})
