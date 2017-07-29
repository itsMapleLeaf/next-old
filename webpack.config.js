const webpack = require('webpack')
const { join } = require('path')
const HtmlPlugin = require('html-webpack-plugin')

const styleLoader = [
  'style-loader',
  'css-loader',
  {
    loader: 'stylus-loader',
    options: {
      paths: './src/styles',
    },
  },
]

const config = {
  entry: './src/main',
  output: {
    path: join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            stylus: styleLoader,
          },
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.mp3$|.ogg$/, loader: 'file-loader' },
      {
        test: /\.styl$/,
        use: styleLoader,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlPlugin({ template: './src/index.html' }),
  ],
  devtool: 'source-map',
}

module.exports = config
