const webpack = require('webpack')
const path = require('path')

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: './vue/main.js',
  output: {
    publicPath: '/build/',
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
