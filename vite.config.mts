import { defineConfig } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'res-chain',
    },
    rollupOptions: {
      output: [
        {
          format: 'esm',
          entryFileNames: '[name].mjs',
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
        },
      ],
    },
  },
});
