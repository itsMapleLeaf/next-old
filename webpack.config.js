const {join} = require('path')
const use = require('postcss-use')

module.exports = {
  entry: join(__dirname, 'src/main.js'),
  output: {
    path: join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.sss$/,
        loader: 'style!css!postcss?parser=sugarss'
      }
    ]
  },
  postcss: () => [
    use({
      resolveFromFile: true,
      modules: '*'
    })
  ],
  devtool: '#inline-source-map'
}
