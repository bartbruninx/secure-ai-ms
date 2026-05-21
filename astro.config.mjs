// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
//
// GitHub Pages deployment:
//   Repo: bartbruninx/secure-ai-ms
//   URL : https://bartbruninx.github.io/secure-ai-ms/
// If a custom domain is added later, remove `base` and update `site`.
export default defineConfig({
  site: 'https://bartbruninx.github.io',
  base: '/secure-ai-ms',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
