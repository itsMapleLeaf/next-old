const {join} = require('path')
const poststylus = require('poststylus')

module.exports = {
  entry: join(__dirname, 'src/main.js'),
  output: {
    path: join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.vue/, loader: 'vue' },
      { test: /\.styl$/, loader: 'style!css!stylus' }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  stylus: {
    use: [
      poststylus([
        'postcss-cssnext',
        'postcss-short',
        'postcss-flexbox'
      ])
    ]
  },
  devtool: 'source-map'
}
