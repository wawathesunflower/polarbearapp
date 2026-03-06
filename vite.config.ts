import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // This tells Vite to look in the right folder
  plugins: [react()],
})
