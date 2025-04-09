import { HstVue } from '@histoire/plugin-vue'
import { defineConfig } from 'histoire'

export default defineConfig({
  setupFile: '/src/histoire.setup.ts',
  tree: {
    groups: [
      {
        title: 'Components',
        id: 'components',
      },
    ],
  },
  vite: {
    server: {
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['../..'],
      },
    },
  },
  plugins: [
    HstVue(),
  ],
})
