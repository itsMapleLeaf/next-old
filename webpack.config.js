const webpack = require('webpack')
const { join } = require('path')
const HtmlPlugin = require('html-webpack-plugin')

const config = {
  entry: ['react-hot-loader/patch', './src/main'],
  output: {
    path: join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: ['react-hot-loader/webpack', 'ts-loader'] },
      { test: /\.json$/, use: 'json-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(mp3|ogg)$/, use: 'file-loader' },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [new webpack.NamedModulesPlugin(), new HtmlPlugin({ template: './src/index.html' })],
  devtool: 'source-map',
}

module.exports = config
