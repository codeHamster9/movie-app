import * as path from 'path'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    build: {
      sourcemap: true,
    },
    base: '/movie-app/',
    plugins: [react()],
    publicDir: 'public',
    server: {
      host: true,
      port: 5173,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
