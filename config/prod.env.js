const { name, version } = require('../package.json')

module.exports = {
  NODE_ENV: '"production"',
  APP_NAME: JSON.stringify(name),
  APP_VERSION: JSON.stringify(version),
}
