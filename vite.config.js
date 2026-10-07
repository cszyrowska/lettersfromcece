import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Set the base path to '/' for custom domain deployment (cszyrowska.com)
  // This ensures all asset paths are rooted correctly.
  base: '/', 
  plugins: [react()],
})