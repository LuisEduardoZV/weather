import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { MAIN_PATH } from './src/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${MAIN_PATH}`
})
