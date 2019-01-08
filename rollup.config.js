import babel from 'rollup-plugin-babel'
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
      ...Object.keys(pkg.dependencies || {}), 'fs', 'path'
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
      ...Object.keys(pkg.dependencies || {}), 'fs', 'path'
    ],
    plugins: [babel()]
  }
]
