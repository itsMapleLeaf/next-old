const webpack = require('webpack')
const path = require('path')

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: './vue/main.js',
  output: {
    publicPath: '/app/build/',
    path: path.join(__dirname, 'app/build'),
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
