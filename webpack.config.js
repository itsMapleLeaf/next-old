const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src/view/main.js'),
  output: {
    publicPath: '/assets/build/',
    path: path.join(__dirname, 'assets/build'),
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
  resolve: {
    alias: {
      modules: path.join(__dirname, 'src/view/modules'),
      styles: path.join(__dirname, 'src/styles')
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  devtool: 'source-map'
}
