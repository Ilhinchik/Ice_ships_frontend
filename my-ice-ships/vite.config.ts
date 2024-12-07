import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
      port: 3000,
      proxy: {
          "/api": {
              target: "http://192.168.1.120:8000",
              changeOrigin: true,
          },
      },
  },
});