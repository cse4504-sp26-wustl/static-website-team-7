import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  base: "/static-website-team-7/", // Set base for GitHub Pages
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});
