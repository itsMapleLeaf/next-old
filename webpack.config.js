const webpack = require('webpack')
const {join} = require('path')

module.exports = {
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' }
    ]
  },
  vue: {
    loaders: {
      stylus: {
        include: join(__dirname, 'src/app/styles')
      }
    }
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.NamedModulesPlugin({
      context: 'src/app'
    })
  ],
  devtool: '#eval-source-map'
}
