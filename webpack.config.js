const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'src/view/main.js'),
  output: {
    path: path.join(__dirname, 'assets/build'),
    publicPath: '/assets/',
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
    root: path.resolve('src')
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  devtool: 'source-map'
}
