import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/website/" : "/",
  plugins: [
    react(),
    {
      name: "latest-pdf-development-pages",
      apply: "serve",
      configureServer(server) {
        // Vite's public middleware needs the filename; production serves directory indexes.
        server.middlewares.use((request, _response, next) => {
          request.url = request.url?.replace(
            /^(\/notes\/[a-z0-9]+(?:-[a-z0-9]+)*\/latest\/)(?=\?|$)/,
            "$1index.html"
          );
          next();
        });
      },
    },
  ],
}));
