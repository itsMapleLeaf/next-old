const webpack = require('webpack')
const { join } = require('path')

const config = {
  entry: './src/main',
  output: {
    path: join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            stylus: 'style-loader!css-loader!stylus-loader?paths=./src/styles',
          },
        },
      },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.mp3$|.ogg$/, loader: 'file-loader' },
    ],
  },
  plugins: [new webpack.NamedModulesPlugin()],
  devtool: 'source-map',
}

module.exports = config
