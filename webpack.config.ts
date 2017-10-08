import * as webpack from 'webpack'
import * as HtmlPlugin from 'html-webpack-plugin'
import { resolve } from 'path'

const config: webpack.Configuration = {
  entry: {
    app: './src/index',
    react: ['react', 'react-dom'],
  },
  output: {
    path: resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            module: 'esnext'
          }
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.svg$/, loader: 'file-loader' },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlPlugin({ template: './src/index.html' }),
    new webpack.optimize.CommonsChunkPlugin({ names: ['react'] }),
    new webpack.NamedModulesPlugin(),
  ],
  devtool: 'source-map',
}

export default config
