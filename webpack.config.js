const webpack = require('webpack')
const { join } = require('path')
const HtmlPlugin = require('html-webpack-plugin')

const config = {
  entry: './src/main',
  output: {
    path: join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(mp3|ogg)$/, loader: 'file-loader' },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [new webpack.NamedModulesPlugin(), new HtmlPlugin({ template: './src/index.html' })],
  devtool: 'source-map',
}

module.exports = config
