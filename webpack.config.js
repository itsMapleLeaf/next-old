const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './vue/main.js',
  output: {
    publicPath: '/dist/build/',
    path: path.join(__dirname, 'dist/build'),
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
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  devtool: '#eval-source-map'
}
