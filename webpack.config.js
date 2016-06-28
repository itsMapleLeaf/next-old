const {join} = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: join(__dirname, 'src/main.js'),
  output: {
    path: join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.vue/,
        loader: 'vue'
      }
    ]
  },
  vue: {
    loaders: {
      stylus: ExtractTextPlugin.extract('css?modules&sourceMap&localIdentName=[path][name]---[local]---[hash:base64:5]&importLoaders=1!stylus')
    }
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ],
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  devtool: 'source-map'
}
