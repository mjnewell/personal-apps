import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    minify: false
  },
  server: {
    port: 5173
  }
})
