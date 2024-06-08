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
        main : 'index.html',
      },
      output: {
        manualChunks: {
          'react': ['react'],
          'react-dom': ['react-dom'],
          'react-router-dom': ['react-router-dom'],
        },
        chunkFileNames: 'static/[name]-[hash].js',
        entryFileNames: 'static/[name]-[hash].js',
        assetFileNames: 'static/[name]-[hash].[ext]',
      },
    },
  },
  base: '/static/',
})
