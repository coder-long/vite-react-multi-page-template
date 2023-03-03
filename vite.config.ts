import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mpa from 'vite-plugin-mpa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mpa()],
  server: {
    host: 'localhost',
    port: 3001
  }
})
