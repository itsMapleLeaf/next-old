import * as CopyPlugin from 'copy-webpack-plugin'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as HTMLPlugin from 'html-webpack-plugin'
import { resolve } from 'path'
import * as webpack from 'webpack'
import * as merge from 'webpack-merge'

const CleanPlugin = require('clean-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const ScriptExtHtmlPlugin = require('script-ext-html-webpack-plugin')

const root = resolve(__dirname)
const sourcePath = resolve(root, 'src')
const outputPath = resolve(root, 'build')

type ConfigEnvironment = {
  production?: boolean
}

export = (env = {} as ConfigEnvironment) => {
  const tsLoader: webpack.Rule = {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    options: {
      compilerOptions: { module: 'esnext' },
    },
    include: [sourcePath],
  }

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: env.production,
    },
  }

  const cssLoaderRule: webpack.Rule = {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      use: [cssLoader],
      fallback: 'style-loader',
    }),
  }

  const sassLoaderRule: webpack.Rule = {
    test: /\.s(c|a)ss$/,
    use: ExtractTextPlugin.extract({
      use: [cssLoader, 'sass-loader'],
      fallback: 'style-loader',
    }),
  }

  const baseConfig: webpack.Configuration = {
    entry: {
      app: resolve(sourcePath, 'main'),
      lib: ['react', 'react-dom'],
    },
    output: {
      filename: 'js/[name].js',
      path: outputPath,
    },
    module: {
      rules: [tsLoader, cssLoaderRule, sassLoaderRule],
    },
    plugins: [
      new HTMLPlugin({
        template: './index.html',
        chunksSortMode: 'dependency',
      }),
      new ScriptExtHtmlPlugin({
        defaultAttribute: 'defer',
      }),
      new CleanPlugin(['build'], { verbose: false }),
      new ExtractTextPlugin({
        filename: 'css/[name].css',
        disable: !env.production,
      }),
    ],
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx'],
      alias: {
        src: sourcePath,
      },
    },
  }

  const devConfig: webpack.Configuration = {
    plugins: [new webpack.NamedModulesPlugin()],
  }

  const prodConfig: webpack.Configuration = {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),
      new CopyPlugin([
        {
          from: 'public',
          to: 'public',
        },
      ]),
      new UglifyPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.CommonsChunkPlugin({ name: 'lib' }),
    ],
  }

  if (env.production) {
    return merge(baseConfig, prodConfig)
  }
  return merge(baseConfig, devConfig)
}
