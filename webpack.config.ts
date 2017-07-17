import * as webpack from 'webpack'
import * as path from 'path'
import * as HtmlPlugin from 'html-webpack-plugin'

const config: webpack.Configuration = {
  entry: './src/main',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  plugins: [
    new HtmlPlugin({ template: './src/index.html' }),
    new webpack.NamedModulesPlugin(),
  ],
  devtool: 'source-map',
}

export default config
