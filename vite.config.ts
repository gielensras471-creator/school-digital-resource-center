import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages project sites use /repository-name/ as their URL prefix.
// Keep the production / base path for the future Tencent Cloud deployment.
const isGitHubPages = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  plugins: [vue()],
  base: isGitHubPages ? '/school-digital-resource-center/' : '/',
  server: { host: '0.0.0.0' },
})
