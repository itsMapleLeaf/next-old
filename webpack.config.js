const webpack = require('webpack')

const config = {
  entry: './app/main.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        vue: {
          loaders: {
            stylus: 'style!css!stylus?paths=./app/styles'
          }
        }
      }
    })
  ],
}

if (process.env.NODE_ENV !== 'production') {
  config.plugins = (config.plugins || []).concat([
    new webpack.NamedModulesPlugin({
      context: 'app',
    }),
  ])
  config.devtool = '#inline-source-map'
}

module.exports = config
