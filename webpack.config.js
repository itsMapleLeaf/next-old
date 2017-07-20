const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const path = require('path')

const vueLoader = {
  test: /\.vue$/,
  loader: 'vue-loader',
  options: {
    esModule: true,
  },
}

const tsLoader = {
  test: /\.tsx?$/,
  loader: 'ts-loader',
  options: {
    appendTsSuffixTo: [/\.vue$/],
  },
}

const styleLoader = {
  test: /\.css$/,
  loader: 'style-loader!css-loader',
}

const config = {
  entry: {
    app: './src/main',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [vueLoader, tsLoader, styleLoader],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.vue'],
  },
  plugins: [
    new HtmlPlugin({ template: './src/index.html' }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
  ],
  devtool: 'source-map',
}

module.exports = config
