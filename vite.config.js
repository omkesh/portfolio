import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { injectMeta } from "./vite-plugin-inject-meta.js";

export default defineConfig({
  base: '/portfolio/', 
  plugins: [react(), injectMeta()],
});
