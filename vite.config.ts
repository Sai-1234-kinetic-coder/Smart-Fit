import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/Smart-Fit/' : '/',
  server: {
    port: 5173,
    host: true,
  },
}));
