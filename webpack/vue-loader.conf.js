var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

const cssLoaders = utils.cssLoaders({
  sourceMap: isProduction ? config.build.productionSourceMap : config.dev.cssSourceMap,
  extract: isProduction,
})

module.exports = {
  loaders: Object.assign({}, cssLoaders, {
    js: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    },
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href',
  },
}
