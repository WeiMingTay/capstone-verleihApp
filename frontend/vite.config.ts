import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api':
          {
            target: 'http://localhost:8080',
          }
    }
  }
})

import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: 'dfqf2lyug',
    api_key: '874954522191928',
    api_secret: 'ShX5F8UmxTlDReVzoy1g-uPWUx0'
});
