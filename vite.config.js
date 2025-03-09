import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        global: 'window'
    },
    server: {
        https: {
            key: fs.readFileSync(path.resolve('localhost+1-key.pem')),
            cert: fs.readFileSync(path.resolve('localhost+1.pem'))
        }
    }
});
