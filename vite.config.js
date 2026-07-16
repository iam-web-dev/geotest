import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Prevent Vite from injecting its own favicon
    middlewareMode: false,
  },
})