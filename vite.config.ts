import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "placeholder.svg"],
      manifest: {
        name: "Dandle Earned Luxury",
        short_name: "Dandle",
        description: "Luxury furniture and comfort solutions by Dandle.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "placeholder.svg",
            sizes: "192x192",
            type: "image/svg+xml",
          },
          {
            src: "placeholder.svg",
            sizes: "512x512",
            type: "image/svg+xml",
          },
          {
            src: "placeholder.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
