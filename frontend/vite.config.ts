import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Any valid host string, e.g. 'localhost', '127.0.0.1'
    port: 8080      // Any valid port number
  }
})
