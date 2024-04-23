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
    outDir: '../public',
    emptyOutDir: true,
    html: {
      inject: {
        injectData: {
          VITE_APP_GOOGLE_MAPS_API_KEY: process.env.VITE_APP_GOOGLE_MAPS_API_KEY
        }
      }
    }
  }
})
