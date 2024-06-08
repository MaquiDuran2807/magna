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
        spinner: 'src/components/spinner.tsx',
        // getsIdServices: 'src/hooks/GetsIdServices.tsx',
        // auth: 'src/auth/AuthProvider.tsx',
        // navbar: 'src/components/navBar.tsx',
        // slider: 'src/components/slider.tsx',
        // proyectoPanel: 'src/components/sections/proyectoPanel.tsx',
      },
      output: {
        manualChunks: {
          'react': ['react'],
          'react-dom': ['react-dom'],
          'react-router-dom': ['react-router-dom'],
          // '@react-pdf/renderer': ['@react-pdf/renderer'],
          '@tanstack/react-query-devtools': ['@tanstack/react-query-devtools'],
          '@motionone/utils': ['@motionone/utils'],
          'axios': ['axios'],
          // 'dompurify': ['dompurify'],
          // 'formik': ['formik'],
          'framer-motion': ['framer-motion'],
          // 'leaflet': ['leaflet'],
          // 'pdfjs-dist': ['pdfjs-dist'],
          // 'react-floating-whatsapp': ['react-floating-whatsapp'],
          // 'react-icons': ['react-icons'],
          // 'react-leaflet': ['react-leaflet'],
          // 'react-pdf': ['react-pdf'],
          // 'react-toastify': ['react-toastify'],
          'swiper': ['swiper'],
          // 'yup': ['yup']
        },
        chunkFileNames: 'static/[name]-[hash].js',
        entryFileNames: 'static/[name]-[hash].js',
        assetFileNames: 'static/[name]-[hash].[ext]',
      },
    },
  },
  base: '/static/',
})
