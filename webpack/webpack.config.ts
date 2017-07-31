import * as webpack from 'webpack'
import * as HtmlPlugin from 'html-webpack-plugin'
import { resolve } from 'path'

const tsLoader = {
  test: /\.tsx?$/,
  loader: 'ts-loader',
  options: {
    appendTsSuffixTo: [/\.vue$/],
    transpileOnly: true,
  },
}

const styleLoader = {
  test: /\.styl$/,
  use: [
    'style-loader',
    'css-loader',
    {
      loader: 'stylus-loader',
      options: {
        paths: './src/styles',
      },
    },
  ],
}

const vueLoader = {
  test: /\.vue$/,
  loader: 'vue-loader',
  options: {
    loaders: {
      stylus: styleLoader.use,
      js: 'ts-loader',
    },
    esModule: true,
  },
}

const config: webpack.Configuration = {
  context: resolve(__dirname, '..'),
  entry: './src/main',
  output: {
    path: resolve(__dirname, '../build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      vueLoader,
      tsLoader,
      styleLoader,
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.mp3$|.ogg$/, loader: 'file-loader' },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
    },
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlPlugin({ template: './src/index.html' }),
  ],
  devtool: 'source-map',
}

export default config
