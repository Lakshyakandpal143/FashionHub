import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // In development, forward /api calls to the Express backend (no CORS setup needed)
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})
