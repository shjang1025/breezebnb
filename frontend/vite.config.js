import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/rails': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
      
  }, 
  build: {
    outDir: '../public' //output to be in the rails public folder
  }
})
