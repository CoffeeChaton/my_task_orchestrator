import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: process.env.NODE_ENV === 'development' ? 3054 : 8080,
  },
  output: {
    assetPrefix: '/my_task_orchestrator/',
  },
});
