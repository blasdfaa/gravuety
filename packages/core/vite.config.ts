/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import Vue from '@vitejs/plugin-vue'
import pkg from './package.json' assert { type: 'json' }

export default defineConfig({
  plugins: [
    Vue(),
    dts({
      entryRoot: 'src',
      staticImport: true,
      cleanVueFileName: true,
    }),
  ],
  build: {
    target: 'esnext',
    lib: {
      name: 'gravity-vue',
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: format => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      output: [
        {
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          entryFileNames: '[name].cjs',
        },
        {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          entryFileNames: '[name].js',
        },
      ],
      external: [
        'vue',
      ],
      // external: [
      //   ...Object.keys(pkg.dependencies ?? {}),
      //   ...Object.keys(pkg.peerDependencies ?? {}),
      // ],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
