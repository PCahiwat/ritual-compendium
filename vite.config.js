import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          bedrock: ['@bedrock_org/passport', 'wagmi', 'viem', '@tanstack/react-query'],
        },
      },
    },
  },
});
