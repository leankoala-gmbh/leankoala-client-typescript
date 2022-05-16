const { build } = require ('esbuild')
const { dependencies } = require ('./package.json')
const { Generator } = require('npm-dts')

const shared = {
  entryPoints: ['./src/360ApiClient'],
  bundle: true,
  minify: true,
  sourcemap: true,
  external: Object.keys( dependencies )
}

new Generator({
  entry: './src/360ApiClient.ts',
  output: './dist/types/360ApiClient.d.ts'
}).generate()

build({
  ...shared,
  format: 'cjs',
  outfile: './dist/360ApiClient.js',
  target: ["esnext", "node16"],
})

build({
  ...shared,
  format: 'esm',
  outfile: './dist/360ApiClient.esm.js',
  target: ["esnext", "node16"],
})

