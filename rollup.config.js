import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

export default [
  // CommonJS
  {
    input: 'src/main.js',
    output: {
      file: `dist/${pkg.name}.cjs.js`,
      format: 'cjs',
      indent: false
    },
    external: [
      ...Object.keys(pkg.dependencies || {})
    ],
    plugins: [babel()]
  },

  // ES
  {
    input: 'src/main.js',
    output: {
      file: `dist/${pkg.name}.esm.js`,
      format: 'es',
      indent: false
    },
    external: [
      ...Object.keys(pkg.dependencies || {})
    ],
    plugins: [babel()]
  },

  // UMD Development
  {
    input: 'src/main.js',
    output: {
      file: `dist/${pkg.name}.umd.js`,
      format: 'umd',
      name: pkg.name,
      indent: false
    },
    plugins: [
      nodeResolve({
        jsnext: true
      }),
      babel({
        exclude: 'node_modules/**'
      })
    ]
  },

  // UMD Production
  {
    input: 'src/main.js',
    output: {
      file: `dist/${pkg.name}.umd.min.js`,
      format: 'umd',
      name: pkg.name,
      indent: false
    },
    plugins: [
      nodeResolve({
        jsnext: true
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]
  }
]
