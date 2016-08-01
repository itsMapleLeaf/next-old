const fs = require('fs')
const path = require('path')
const {convertHtml} = require('html2jade')

const convertOptions = {
  bodyless: true,
  noemptypipe: true
}

fs.readdirSync('app/view')
  .map(file => path.join(__dirname, 'app/view', file))
  .map(path => {
    return { path, content: fs.readFileSync(path).toString() }
  })
  .map(entry => {
    const [match, template] = entry.content.match(/<template>([\s\S]*)<\/template>/)
    entry.match = match
    entry.template = template
    return entry
  })
  .forEach(entry => {
    convertHtml(entry.template, convertOptions, (err, jade) => {
      if (err) throw err
      const content = entry.content.replace(entry.match, `<template lang='jade'>\n${jade}</template>`)
      fs.writeFile(entry.path, content, err => {
        if (err) throw err
        console.log('Successfully converted', entry.path)
      })
    })
  })
