import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import purgecss from 'vite-plugin-purgecss'
import { resolve } from 'path'

export default defineConfig({
  envDir: '../../',
  plugins: [react(),
    purgecss({
      content: ['./index.page.html', './index.store.html', './src/**/*.{tsx,ts,jsx,js}'],
      safelist: {
        standard: [
          /^swiper/, /^leaflet/, /^toast/, /^floating/,
          /^offcanvas/, /^modal/, /^fade/, /^show/, /^slide/,
          /^navbar/, /^nav-/, /^collapse/, /^collapsing/,
          /^fixed-/, /^sticky/,
          /^navbar-toggler/,
          /^container/,
        ],
      },
    }),
  ],
  server: {
    fs: {
      strict: false
    },
    open: '/index.page.html',
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      input: {
        page: resolve(__dirname, 'index.page.html'),
        store: resolve(__dirname, 'index.store.html'),
      },
      output: {
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react/')) return 'vendor-react'
            if (id.includes('react-router') || id.includes('@remix-run')) return 'vendor-router'
            if (id.includes('bootstrap') || id.includes('react-bootstrap')) return 'vendor-bootstrap'
            if (id.includes('framer-motion') || id.includes('motion')) return 'vendor-animation'
            if (id.includes('swiper') || id.includes('leaflet')) return 'vendor-ui'
            if (id.includes('@tanstack')) return 'vendor-query'
            if (id.includes('formik') || id.includes('yup')) return 'vendor-forms'
            if (id.includes('axios') || id.includes('dompurify') || id.includes('react-ga4')) return 'vendor-utils'
            if (id.includes('react-icons')) return 'vendor-icons'
            if (id.includes('react-toastify')) return 'vendor-toast'
            if (id.includes('react-pdf') || id.includes('pdfjs')) return 'vendor-pdf'
            if (id.includes('lottie')) return 'vendor-react'
            if (id.includes('react-floating-whatsapp') || id.includes('react-lazy-load-image')) return 'vendor-widgets'
            if (id.includes('react-intersection-observer')) return 'vendor-intersection'
            if (id.includes('scheduler')) return 'vendor-react'
            return 'vendor-other'
          }
        },
      },
    },
  },
  base: '/static/',
})
