import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// If you specifically want the compiler via Babel:
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Ensure you have installed @rolldown/plugin-babel
    babel({ 
      plugins: [['babel-plugin-react-compiler', { target: '19' }]],
    })
  ],
})