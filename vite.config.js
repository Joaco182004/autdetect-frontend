import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'] // Dividir las bibliotecas de React en un chunk separado
        }
      }
    },
    chunkSizeWarningLimit: 1500 // Ajustar el límite de tamaño de advertencia a 1000 kB o el valor que prefieras
  }
})
