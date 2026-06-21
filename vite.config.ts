import { defineConfig } from 'vite'
import { visualizer } from "rollup-plugin-visualizer";
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
    visualizer({
      open: true,
      gzipSize: true,
    })
  ],
})