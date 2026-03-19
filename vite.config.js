import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/catReviewWebsite-Official/",
  plugins: [react()],
  server: {
    watch: {
      ignored: ["**/db.json", "**/db.seed.json"],
    },
  },
});
