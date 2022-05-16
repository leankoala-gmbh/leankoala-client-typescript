const { build } = require ('esbuild')
const { dependencies } = require ('./package.json')
const { Generator } = require('npm-dts')

const shared = {
  entryPoints: ['./src/360ApiClient'],
  bundle: true,
  sourcemap: true,
  external: Object.keys( dependencies )
}

const sharedSingleFiles = {
  minify: true,
  format: 'esm',
  target: ['es6']
}


// new Generator({
//   entry: './src/360ApiClient.ts',
//   output: './dist/types/360ApiClient.d.ts'
// }).generate()

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

build({
  ...sharedSingleFiles,
  entryPoints: ['./src/Connection/RefreshTokenInvalidError.ts', './src/Connection/BadRequestError.ts'],
  outdir: './dist/connection'
})

build({
  ...sharedSingleFiles,
  entryPoints: ['./src/Repository/Constants/Marketplace.ts'],
  outdir: './dist/constants'
})
