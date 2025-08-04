import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Proxy API requests to your backend server
      '/api': {
        target: 'http://localhost:3000', // Replace with your backend server URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix if needed
      },
      // Example: Proxy database requests
      '/db': {
        target: 'http://localhost:5432', // Replace with your database server URL
        changeOrigin: true,
        secure: false,
      },
      // Example: Proxy authentication requests
      '/auth': {
        target: 'http://localhost:3000', // Replace with your auth server URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
