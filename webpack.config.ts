import * as webpack from 'webpack'
import * as HTMLWebpackPlugin from 'html-webpack-plugin'
import { resolve } from 'path'

const root = resolve(__dirname)
const sourcePath = resolve(root, 'src')
const outputPath = resolve(root, 'build')

const tsLoader = {
  test: /\.tsx?$/,
  loader: 'ts-loader',
  options: {
    compilerOptions: { module: 'esnext' },
  },
}

const cssLoader = {
  test: /\.css$/,
  loader: 'style-loader!css-loader',
}

const sassLoader = {
  test: /\.s(c|a)ss$/,
  loader: 'style-loader!css-loader!sass-loader',
}

const config: webpack.Configuration = {
  entry: {
    app: resolve(sourcePath, 'main'),
  },
  output: {
    filename: '[name].bundle.js',
    path: outputPath,
  },
  module: {
    rules: [tsLoader, cssLoader, sassLoader],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
    alias: {
      '@': sourcePath,
    },
  },
  // devtool: 'eval-source-map',
}

export = config
