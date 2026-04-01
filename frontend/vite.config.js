import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({

 
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
        register: resolve(__dirname, 'register.html'),
        login: resolve(__dirname, 'login.html'),
      },
    },
  },
})
