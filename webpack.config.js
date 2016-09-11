const webpack = require('webpack')

module.exports = {
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.styl$/, loader: 'style!css!stylus' },
      // { test: /\.css$/, loader: 'style!css' },
      { test: /\.json$/, loader: 'json' }
    ]
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
