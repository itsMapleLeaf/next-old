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
      modules: path.join(__dirname, 'src/modules'),
      types: path.join(__dirname, 'src/types'),
      styles: path.join(__dirname, 'src/styles'),
      view: path.join(__dirname, 'src/view')
    }
  },
  babel: {
    presets: ['es2015', 'stage-1'],
    plugins: [
      'typecheck',
      'syntax-flow',
      'transform-flow-strip-types',
      'transform-runtime'
    ]
  },
  devtool: 'source-map'
}
