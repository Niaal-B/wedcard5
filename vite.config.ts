import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

function saveMusicConfigPlugin(): Plugin {
  return {
    name: 'save-music-config',
    configureServer(server) {
      server.middlewares.use('/api/save-music-config', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end()
          return
        }
        let body = ''
        req.on('data', (chunk) => (body += chunk))
        req.on('end', () => {
          try {
            const { youtubeId, startSeconds } = JSON.parse(body)
            const contents = `export type MusicConfig = {\n  youtubeId: string;\n  startSeconds: number;\n};\n\nexport const musicConfig: MusicConfig = {\n  youtubeId: '${youtubeId}',\n  startSeconds: ${startSeconds}\n};\n`
            writeFileSync(resolve(__dirname, 'src/data/music.ts'), contents)
            res.statusCode = 200
            res.end('ok')
          } catch (err) {
            res.statusCode = 500
            res.end(String(err))
          }
        })
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), saveMusicConfigPlugin()],
})
