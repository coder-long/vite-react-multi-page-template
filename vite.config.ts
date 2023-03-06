import { rmSync } from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-electron-plugin'
import { customStart, loadViteEnv } from 'vite-electron-plugin/plugin'
import renderer from 'vite-plugin-electron-renderer'
import pkg from './package.json'
import mpa from 'vite-plugin-mpa';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  rmSync('dist-electron', { recursive: true, force: true })

  const sourcemap = command === 'serve' || !!process.env.VSCODE_DEBUG;
  // 处理electron 打包之后页面找不到js等资源地址 （vite 修改打包后页面引用js的地址）
  const base = command === 'serve' ? '/' : path.resolve(__dirname, 'dist');

  return {
    base,
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      },
    },
    plugins: [
      react(),
      electron({
        include: [
          'electron'
        ],
        transformOptions: {
          sourcemap,
        },
        plugins: [
          ...(!!process.env.VSCODE_DEBUG
            ? [
              // Will start Electron via VSCode Debug
              customStart(() => console.log(/* For `.vscode/.debug.script.mjs` */'[startup] Electron App')),
            ]
            : []),
          // Allow use `import.meta.env.VITE_SOME_KEY` in Electron-Main
          loadViteEnv(),
        ],
      }),
      // Use Node.js API in the Renderer-process
      renderer({
        nodeIntegration: false,
      }),
      /**
       * 多页面配置插件
       * 目录结构遵循
       * -src
       *  -pages
       *    - pageone
       *    - pagetwo
       */
      mpa({
        open: false
      }),
    ],
    server: !!process.env.VSCODE_DEBUG ? (() => {
      const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL)
      return {
        host: url.hostname,
        port: +url.port,
      }
    })() : undefined,
    clearScreen: false,
    build: {
      outDir: path.join(__dirname, 'dist'),
      assetsDir: 'assets'
    },
  }
})
