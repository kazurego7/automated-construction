import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 80,
    host: "0.0.0.0",
    allowedHosts: mode === "development" ? true : ["your-production-host.com"],
  },
}));
