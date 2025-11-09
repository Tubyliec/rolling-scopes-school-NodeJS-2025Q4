import { defineConfig } from 'vite';
import { resolve } from 'path';
import { builtinModules } from 'module';

export default defineConfig({
  server: {
    port: 4000,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'node16',
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        cluster: resolve(__dirname, 'src/cluster.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        ...builtinModules,
        ...builtinModules.map((m) => `node:${m}`),
        'dotenv',
      ],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name][extname]',
        format: 'es',
        preserveModules: false,
        inlineDynamicImports: false,
      },
    },
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'production',
    ),
  },
});
