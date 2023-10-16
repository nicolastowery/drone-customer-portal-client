import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/drone-customer-portal-client/",
  plugins: [react(), eslint()],
});
