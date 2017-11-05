import * as CopyPlugin from "copy-webpack-plugin"
import * as ExtractTextPlugin from "extract-text-webpack-plugin"
import * as HTMLPlugin from "html-webpack-plugin"
import { resolve } from "path"
import * as webpack from "webpack"
import * as merge from "webpack-merge"

const CleanPlugin = require("clean-webpack-plugin")
const UglifyPlugin = require("uglifyjs-webpack-plugin")
const ScriptExtHtmlPlugin = require("script-ext-html-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

const meta = require("./package.json")

const root = resolve(__dirname)
const sourcePath = resolve(root, "src")
const outputPath = resolve(root, "build")

type ConfigEnvironment = {
  production?: boolean
}

export default (env = {} as ConfigEnvironment) => {
  const babelLoader: webpack.Loader = {
    loader: "babel-loader",
    options: {
      plugins: ["emotion", "lodash"],
    },
  }

  const tsLoader: webpack.Loader = {
    loader: "ts-loader",
    options: {
      compilerOptions: {
        module: "esnext",
      },
      transpileOnly: true,
    },
  }

  const cssLoader: webpack.Loader = {
    loader: "css-loader",
    options: {
      minimize: env.production,
    },
  }

  const sourceRule: webpack.Rule = {
    test: /\.tsx?$/,
    include: [sourcePath],
    use: [babelLoader, tsLoader],
  }

  const cssLoaderRule: webpack.Rule = {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      use: [cssLoader],
      fallback: "style-loader",
    }),
  }

  const sassLoaderRule: webpack.Rule = {
    test: /\.s(c|a)ss$/,
    use: ExtractTextPlugin.extract({
      use: [cssLoader, "sass-loader"],
      fallback: "style-loader",
    }),
  }

  const baseConfig: webpack.Configuration = {
    entry: {
      app: resolve(sourcePath, "main"),
    },
    output: {
      filename: "js/[name].js",
      path: outputPath,
    },
    module: {
      rules: [sourceRule, cssLoaderRule, sassLoaderRule],
    },
    plugins: [
      new HTMLPlugin({
        template: "./index.html",
        chunksSortMode: "dependency",
      }),

      new ScriptExtHtmlPlugin({
        defaultAttribute: "defer",
      }),

      new CleanPlugin(["build"], { verbose: false }),

      new ExtractTextPlugin({
        filename: "css/[name].css",
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
      extensions: [".js", ".json", ".ts", ".tsx"],
      alias: {
        src: sourcePath,
        tslib: "tslib/tslib.es6.js",
      },
    },
  }

  const devConfig: webpack.Configuration = {
    plugins: [new webpack.NamedModulesPlugin()],
    devtool: "eval-source-map",
  }

  const prodConfig: webpack.Configuration = {
    plugins: [
      new CopyPlugin([
        {
          from: "public",
          to: "public",
        },
      ]),

      new webpack.DefinePlugin({
        "process.env.NODE_ENV": '"production"',
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: "lib",
        minChunks: ({ resource }) => {
          return resource && resource.includes("node_modules")
        },
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: "react",
        minChunks: ({ resource }) => {
          return resource && resource.includes("react")
        },
      }),

      new UglifyPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
    ],
    devtool: "source-map",
  }

  if (env.production) {
    return merge(baseConfig, prodConfig)
  }
  return merge(baseConfig, devConfig)
}
