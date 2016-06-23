'use strict'

const fs = require('fs')
const path = require('path')

const files = fs.readdirSync(path.join(__dirname, 'src/components'))

for (let file of files) {
  const {name, ext} = path.parse(file)

  if (ext === '.vue') {
    const content = fs.readFileSync(path.join(__dirname, 'src/components', file)).toString()
    const [, template] = content.match(/<template.*>([\s\S]+)<\/template>/)
    const [, script] = content.match(/<script.*>([\s\S]+)<\/script>/)
    const [, style = ''] = content.match(/<style.*>([\s\S]+)<\/style>/) || []

    const output = script.replace(
      /(export default \{)/,
      `const template = \`${template}\`\r\n\r\n$1\r\n  template,\r\n`)

    fs.writeFileSync(path.join(__dirname, 'src/components', name + '.vue.js'), output)
  }
}
