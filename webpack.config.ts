import * as webpack from 'webpack'
import * as path from 'path'
import * as HtmlPlugin from 'html-webpack-plugin'

const config: webpack.Configuration = {
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
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.vue'],
  },
  plugins: [
    new HtmlPlugin({ template: './src/index.html' }),
    new webpack.NamedModulesPlugin(),
  ],
  devtool: 'source-map',
}

export default config
