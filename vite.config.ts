import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import path from 'path'

const pathSrc = path.resolve(__dirname,'src')
export default defineConfig({
  plugins: [
      vue(),
      AutoImport({
          include: [
              /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
              /\.vue$/,
              /\.vue\?vue/, // .vue
              /\.md$/, // .md
          ],
          imports: ['vue'],
          resolvers: [
              ElementPlusResolver(),
          ],
          dts: path.resolve(pathSrc,'auto-imports.d.ts'),
          eslintrc:{
              enabled: true
          }
      }),
      Components({
        resolvers: [
            ElementPlusResolver()],
          dts: path.resolve(pathSrc,'components.d.ts')
      }),
  ],
    resolve:{
      alias: {
          '@':pathSrc
      }
    },
    server:{
      host: '127.0.0.1',
        port: 7247,
        proxy:{
          '/api': {
              target: 'http://localhost:5129',
              rewrite: path => path.replace(/^\/api/, ''),
              changeOrigin: true
          }
        }
    }
})
