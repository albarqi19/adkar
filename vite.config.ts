import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons/icon.svg"],
      manifest: {
        name: "قلب يذكر الله",
        short_name: "استغفار",
        lang: "ar",
        start_url: ".",
        display: "standalone",
        background_color: "#0c1023",
        theme_color: "#0c1023",
        description: "عداد استغفار وأذكار مع تذكيرات يومية ودعم PWA",
        dir: "rtl",
        icons: [
          {
            src: "icons/icon.svg",
            sizes: "192x192 256x256 384x384 512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,webmanifest}"]
      },
    }),
  ],
  server: {
    host: true,
  },
});
