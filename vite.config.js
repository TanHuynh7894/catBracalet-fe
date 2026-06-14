import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const allowedHosts = (env.VITE_URL_FE || '')
    .split(',')
    .map(url => {
      try {
        return new URL(url.trim()).hostname
      } catch {
        return null
      }
    })
    .filter(Boolean)

  return {
    plugins: [react()],
    assetsInclude: ['**/*.glb'],
    server: {
      host: '0.0.0.0',
      port: Number(env.PORT) || 5174,
      allowedHosts,
    },
  }
})