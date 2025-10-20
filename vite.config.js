import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // 👈 Important!
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'robots.txt',
        'apple-touch-icon.png',
        'pwa-192x192.png',
        'pwa-512x512.png'
      ],
      manifest: {
        name: 'TrustAI',
        short_name: 'TrustAI',
        description: 'TrustAI - Trade with AI',
        theme_color: '#a4d1ff',
        background_color: '#ffffff',
        display: 'fullscreen', // instead of 'standalone'
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  server: {
    port: 3000,
    proxy: {
      // This proxies any request starting with /api to your backend server
      '/api': {
        target: 'http://localhost:8080', // Replace with your backend URL
        changeOrigin: true,
        secure: false,
        // Optionally rewrite the path
        // rewrite: (path) => path.replace(/^\/api/, ''),  // remove /api prefix when proxying
      },
    },
    historyApiFallback: true,
  },
})


