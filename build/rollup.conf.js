import buble from 'rollup-plugin-buble'
import copy from 'rollup-plugin-copy'
import json from 'rollup-plugin-json'
import pkg from '../package.json'
import nodeResolve from 'rollup-plugin-node-resolve'
import { standard as banner } from './rollup.conf.banner'

const base = {
  input: './src/index.js',
  plugins: [
    json(),
    nodeResolve(),
    buble(),
    copy({
      targets: [
        {src: './src/index.d.ts', dest: './dist', rename: 'acorn-jsx-walk.d.ts'}
      ]
    })
  ],
}

const es = Object.assign({}, base, {
  external: [...Object.keys(pkg.dependencies || {})],
  output: {
    banner,
    format: 'es',
    file: './dist/acorn-jsx-walk.mjs',
  },
})

const umd = Object.assign({}, base, {
  output: {
    banner,
    format: 'umd',
    file: './dist/acorn-jsx-walk.js',
    name: 'withJsx',
  },
})

export default [es, umd]
