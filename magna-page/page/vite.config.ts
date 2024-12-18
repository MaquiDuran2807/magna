import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  ],
  server: {
    fs: {
      strict: false
    },
  },
  build: {
    sourcemap: 'inline',
    rollupOptions: {
      input: {
        main: 'index.html',
        PagesLayout: 'src/layouts/pagesLayouts.tsx',
        app: 'src/App.tsx',
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]',
      },
    },
  },
  base: '/static/',
})
