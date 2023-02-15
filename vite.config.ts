import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from 'vite-plugin-compression';
import zlib from 'zlib';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: "brotliCompress",
      threshold: 1024,
      compressionOptions: {
        params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 },
      },
    }),
    viteCompression({
      algorithm: "gzip",
      threshold: 1024,
    }),
  ],
});
