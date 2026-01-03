import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), "");

  return {
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
          host: `${env.VITE_HOST_APP_URL}/assets/remoteEntry.js`,
          shared: `${env.VITE_SHARED_APP_URL}/assets/remoteEntry.js`,
        },
      }),
    ],
    build: {
      port: 5002,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
    define: {
      // Inject environment variables into the app at build time
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  };
});
