import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // For Vercel deployment, use root path (/) instead of a subpath
  base: '/', 
})
