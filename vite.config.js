import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Assets in /public are served at root — /images/... and /videos/...
  publicDir: "public",
});
