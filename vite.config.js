import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // ✅ Ensure the local dev server runs on port 3000
  },
  preview: {
    port: 8080, // ✅ Set preview port for Render
    host: '0.0.0.0', // ✅ Bind to all IPs for Render compatibility
  }
});
