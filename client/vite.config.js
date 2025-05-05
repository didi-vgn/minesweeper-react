import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "copy-index-to-404",
      closeBundle: () => {
        const distPath = path.resolve(__dirname, "dist");
        fs.copyFileSync(`${distPath}/index.html`, `${distPath}/404.html`);
      },
    },
  ],
  base: "/minesweeper-react",
});
