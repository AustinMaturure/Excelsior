import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const cssFileName = 'index.min.css'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [react()],
  publicDir: './public',
  build: {
    outDir: 'static',
    rollupOptions: {
      input: {
        // Specify the path to your JavaScript entry file
        main: 'src/main.jsx',
        // Specify the path to your CSS entry file
        css: './src/css/index.css',
      },
      output: {
        assetFileNames:(file) => {
          return `assets/css/${cssFileName}`
        },
        entryFileNames: (file) => {
          return `assets/js/[name].min.js`
        }
      }
    }
  }
})
