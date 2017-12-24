import * as CopyPlugin from 'copy-webpack-plugin'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as HTMLPlugin from 'html-webpack-plugin'
import { resolve } from 'path'
import * as webpack from 'webpack'
import * as merge from 'webpack-merge'

const CleanPlugin = require('clean-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const ScriptExtHtmlPlugin = require('script-ext-html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const meta = require('./package.json')

const root = resolve(__dirname)
const sourcePath = resolve(root, 'src')
const outputPath = resolve(root, 'build')

export default (env: { production?: boolean } = {}) => {
  const babelPlugins = env.production ? ['emotion', 'lodash'] : ['emotion']

  const babelLoader: webpack.Loader = {
    loader: 'babel-loader',
    options: {
      plugins: babelPlugins,
    },
  }

  const tsLoader: webpack.Loader = {
    loader: 'ts-loader',
    options: {
      compilerOptions: {
        module: 'esnext',
      },
      transpileOnly: true,
    },
  }

  const cssLoader: webpack.Loader = {
    loader: 'css-loader',
    options: {
      minimize: env.production,
    },
  }

  const sourceRule: webpack.Rule = {
    test: /\.tsx?$/,
    use: [babelLoader, tsLoader],
    include: [sourcePath],
  }

  const cssLoaderRule: webpack.Rule = {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      use: [cssLoader],
      fallback: 'style-loader',
    }),
  }

  const baseConfig: webpack.Configuration = {
    entry: {
      app: resolve(sourcePath, 'main'),
    },
    output: {
      filename: 'js/[name].js',
      path: outputPath,
    },
    module: {
      rules: [sourceRule, cssLoaderRule],
    },
    plugins: [
      new HTMLPlugin({
        template: './index.html',
        chunksSortMode: 'dependency',
        inject: 'head',
      }),

      new ScriptExtHtmlPlugin({
        defaultAttribute: 'defer',
      }),

      new ExtractTextPlugin({
        filename: 'css/[name].css',
        disable: !env.production,
      }),

      new webpack.DefinePlugin({
        APP_NAME: JSON.stringify(meta.name),
        APP_VERSION: JSON.stringify(meta.version),
      }),

      new ForkTsCheckerWebpackPlugin({
        tslint: true,
      }),
    ],
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx'],
    },
    devServer: {
      historyApiFallback: true,
    },
  }

  const devConfig: webpack.Configuration = {
    plugins: [new webpack.NamedModulesPlugin()],
    devtool: 'eval-source-map',
  }

  const prodConfig: webpack.Configuration = {
    plugins: [
      new CleanPlugin(['build'], { verbose: false }),

      new CopyPlugin([
        {
          from: 'public',
          to: 'public',
        },
      ]),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: 'lib',
        minChunks: ({ resource }) => {
          return resource && resource.includes('node_modules')
        },
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: 'react',
        minChunks: ({ resource }) => {
          return resource && resource.includes('react')
        },
      }),

      new webpack.optimize.ModuleConcatenationPlugin(),

      new UglifyPlugin({
        sourceMap: true,
      }),
    ],
    devtool: 'source-map',
  }

  if (env.production) {
    return merge(baseConfig, prodConfig)
  }
  return merge(baseConfig, devConfig)
}
