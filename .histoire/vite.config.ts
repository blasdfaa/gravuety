import { HstVue } from '@histoire/plugin-vue'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const projectRootDir = resolve(__dirname)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  histoire: {
    plugins: [HstVue()],
    storyMatch: [resolve(projectRootDir, '../packages/core/src/**/*.story.vue')],
    outDir: './dist',
    tree: {
      groups: [
        { title: 'Components', include: _file => true },
        { id: 'utilities', title: 'Utilities' },
      ],
    },
    theme: {
      title: 'Gravuety UI',
      logo: {
        square: '../docs/content/public/logo.svg',
        light: '../docs/content/public/logo.svg',
        dark: '../docs/content/public/logo.svg',
      },
    },
  },

  server: {
    fs: {
      // Allow serving files from two level up to the project root
      allow: ['..'],
    },
    host: true,
  },
})
