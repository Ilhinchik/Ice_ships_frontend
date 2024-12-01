import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA, VitePWAOptions} from "vite-plugin-pwa";


const manifestForPlugin: Partial<VitePWAOptions> = {
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
    manifest: {
        name: 'Заявки на проводку кораблей',
        short_name: 'ЗПК',
        description: 'Описание',
        theme_color: '#ffffff',
        icons: [
            {
                src: 'pwa-192x192.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: 'pwa-512x512.png',
                sizes: '512x512',
                type: 'image/png'
            }
        ]
    }
};

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA(manifestForPlugin)
  ],
  server: {
      port: 3000,
      strictPort: true,
      host: host || false,
      proxy: {
          "/api": {
              target: "http://192.168.1.120:8000",
              changeOrigin: true,
          },
      },
  },
});