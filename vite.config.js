import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'; // Asegúrate de tener esta línea

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  alias: {
      '@': path.resolve(__dirname, './src'), // Aquí se define el alias
    },
})
