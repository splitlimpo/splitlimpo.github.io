import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://splitlimpo.com.br",
  vite: {
    plugins: [tailwindcss()],
  },
});
