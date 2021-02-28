import { resolve } from 'path'
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import twstyled from 'vite-plugin-twstyled'

export default defineConfig({
  plugins: [twstyled(), reactRefresh()],
  base: './',
  root: resolve('./src/renderer'),
  build: {
    outDir: resolve('./dist'),
    emptyOutDir: true
  },
  resolve: {
    alias: [
      {
        find: '@/renderer',
        replacement: resolve(__dirname, 'src/renderer')
      },
      {
        find: '@/common',
        replacement: resolve(__dirname, 'src/common')
      }
    ]
  }
})
