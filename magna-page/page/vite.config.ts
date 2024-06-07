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
        splashScreen: 'src/components/splashScreen.tsx',
        GetsIdServices: 'src/hooks/GetsIdServices.tsx',
        spinner: 'src/components/spinner.tsx',
      },
      output: {
        manualChunks: {
          'react': ['react'],
          'react-dom': ['react-dom'],
          'react-router-dom': ['react-router-dom'],
          '@react-pdf/renderer': ['@react-pdf/renderer'],
          '@tanstack/react-query-devtools': ['@tanstack/react-query-devtools'],
          '@motionone/utils': ['@motionone/utils'],
          'axios': ['axios'],
          'dompurify': ['dompurify'],
          'formik': ['formik'],
          'framer-motion': ['framer-motion'],
          'install': ['install'],
          'leaflet': ['leaflet'],
          'npm': ['npm'],
          'pdfjs-dist': ['pdfjs-dist'],
          'react-floating-whatsapp': ['react-floating-whatsapp'],
          'react-icons': ['react-icons'],
          'react-leaflet': ['react-leaflet'],
          'react-pdf': ['react-pdf'],
          'react-toastify': ['react-toastify'],
          'swiper': ['swiper'],
          'yup': ['yup']

        },
        chunkFileNames: 'static/[name]-[hash].js',
        entryFileNames: 'static/[name]-[hash].js',
        assetFileNames: 'static/[name]-[hash].[ext]',
        

      },
    },
  },
  base: '/static/',
})
