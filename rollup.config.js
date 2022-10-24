import { terser } from 'rollup-plugin-terser'

export default {
  input: './wc-star-review.js',
  output: {
    file: 'dist/wc-star-review.min.js',
    format: 'iife',
    sourcemap: 'inline',
  },
  plugins: [terser()],
}