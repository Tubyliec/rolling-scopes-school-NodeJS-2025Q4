import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['node:http', 'node:path', 'node:url', 'dotenv'],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]',
      },
    },
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
});