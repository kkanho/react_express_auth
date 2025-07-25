import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/uploadthing': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
    }
  }
})
