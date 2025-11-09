import { defineConfig } from 'vite';
import { resolve } from 'path';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  server: {
    port: 4000,
  },
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
  resolve: {
    extensions: ['.ts', '.js'],
  },
});