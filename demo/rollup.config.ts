import { defineConfig } from 'rollup'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import html from '@rollup/plugin-html'
import sass from 'rollup-plugin-sass'
import ts from 'rollup-plugin-typescript2'
import path from 'node:path'
import fs from 'node:fs'

const root = process.cwd()

const demoDist = path.resolve(root, './demo/dist')
const htmlTemplate = fs.readFileSync(path.resolve(root, './demo/index.html'), { encoding: 'utf8' })

export default defineConfig({
  input: 'demo/src/index.ts',
  output: [
    {
      format: 'es',
      file: 'demo/dist/bundle.js'
    }
  ],
  plugins: [
    nodeResolve(),
    ts(),
    html({ title: 'SVG-FAN DEMO', template: () => htmlTemplate }),
    livereload(demoDist),
    serve({
      open: true, // 是否打开浏览器
      contentBase: [demoDist], // 入口 html 文件位置
      historyApiFallback: true, // 设置为 true 返回 index.html 而不是 404
      host: 'localhost', //
      port: 3005, // 端口号
      onListening: function (server) {
        console.log('\x1B[33m%s\x1b[0m:', 'The rollup dev Serve is start!!!')
        const address = server.address() as any
        const host = address.address === '::' ? 'localhost' : address.address // by using a bound function, we can access options as `this`
        const protocol = (this as any)?.https ? 'https' : 'http'
        console.log('\x1B[36m%s\x1B[0m', `Serve is listening in ${address.port}`)
        console.log(
          '\x1B[35m%s\x1B[39m',
          `You can click   ${protocol}://${host}:${address.port}/   go to Browser`
        )
        console.log(
          '\x1B[34m%s\x1B[39m',
          `You can click   ${protocol}://localhost:${address.port}/  go to Browser`
        )
      }
    }),
    sass({ output: './demo/dist/index.css' })
  ]
})
