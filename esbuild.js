const { build } = require ('esbuild')
const { dependencies } = require ('./package.json')

const shared = {
  entryPoints: ['./src/360ApiClient'],
  bundle: true,
  sourcemap: true,
  external: Object.keys( dependencies )
}

build({
  ...shared,
  format: 'cjs',
  outfile: './dist/360ApiClient.js',
  target: ['es6'],
})

build({
  ...shared,
  format: 'esm',
  outfile: './dist/360ApiClient.esm.js',
  target: ['es6'],
})
