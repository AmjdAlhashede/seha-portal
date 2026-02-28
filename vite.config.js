import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            'sweetalert2-react-content': path.resolve(__dirname, 'node_modules/sweetalert2-react-content'),
        },
        dedupe: ['react', 'react-dom', 'sweetalert2'],
    },
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'https://www.seha.sa',
                changeOrigin: true,
            },
        },
    },
    build: {
        outDir: 'dist',
    },
});
