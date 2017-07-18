const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const path = require('path')

const config = {
  entry: {
    app: './src/main',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: true,
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.vue'],
  },
  plugins: [
    new HtmlPlugin({ template: './src/index.html' }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  devtool: 'source-map',
}

module.exports = config
