import { resolve } from 'node:path'
import { HstVue } from '@histoire/plugin-vue'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

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
