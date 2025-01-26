import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "book-list",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
      },
      shared: ["react", "react-dom", "tailwindcss"],
      remotes: {
        host: "http://localhost:5001/assets/remoteEntry.js",
      },
    }),
  ],
  build: {
    port: 5002,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
