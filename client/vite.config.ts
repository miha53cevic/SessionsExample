import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Repo Name mora biti dodani tu prije inace se ne mogu loadati fileovi
  base: '/SessionsExample/'
})
