import * as path from 'path'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'


export default defineConfig(({ command }) => {
  return {
    build: {
      sourcemap: true,
    },
    base: command === 'serve' ? '/' : '/movie-app/',
    plugins: [react()],
    publicDir: 'public',
    server: {
      host: true,
      port: 3000,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
