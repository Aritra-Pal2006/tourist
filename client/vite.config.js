import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    allowedHosts: [
      '4f1d74b26738.ngrok-free.app',
      'localhost'
    ]
  },
  build: {
    outDir: 'dist',
  }
})