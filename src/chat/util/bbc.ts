import { createParser } from 'bbc.js'
import path from 'path'
import { parse as parseURL } from 'url'

import { getAvatarURL, getExtendedIcon, getProfileURL } from 'src/api'

const parser = createParser({
  b: { render: text => `<span class="bbc-bold">${text}</span>` },
  i: { render: text => `<span class="bbc-italic">${text}</span>` },
  u: { render: text => `<span class="bbc-underline">${text}</span>` },
  s: { render: text => `<span class="bbc-strike">${text}</span>` },
  sup: { render: text => `<span class="bbc-super">${text}</span>` },
  sub: { render: text => `<span class="bbc-sub">${text}</span>` },
  url: { render: (text, url) => formatLink(url, text) },
  color: {
    render: (text, color) => (color ? `<span class="bbc-color-${color}">${text}</span>` : text),
  },
  noparse: {
    render: text => text,
    deep: false,
  },
  icon: { render: name => formatUserIcon(name) },
  eicon: { render: name => formatExtendedIcon(name) },
  user: { render: name => formatUserIcon(name) },
  session: { render: (id, name) => formatPrivateChannel(id, name) },
  channel: { render: name => formatPublicChannel(name) },
})

export function parseBBC(input: string) {
  return parser.parse(input)
}

function formatUserIcon(name: string) {
  const href = getProfileURL(name)
  const avatar = getAvatarURL(name)
  const style = `background-image: url(${avatar})`
  return `<a class='bbc-icon' href='${href}' target='_blank' style='${style}'></a>`
}

function formatExtendedIcon(icon: string) {
  const iconURL = getExtendedIcon(icon)
  return `<div class='bbc-icon' style='background-image: url(${iconURL})'></div>`
}

function formatPublicChannel(id: string) {
  return (
    `<a href='#' class='bbc-channel' data-channel='${id}'>` +
    `<i class='mdi mdi-earth'></i> ${id}` +
    `</a>`
  )
}

function formatPrivateChannel(id: string, name: string) {
  return (
    `<a href='#' class='bbc-channel' data-channel='${id}'>` +
    `<i class='mdi mdi-key-variant'></i> ${name}` +
    `</a>`
  )
}

function formatLink(url: string, text: string) {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.gif']
  const { pathname } = parseURL(url)
  const ext = pathname ? path.extname(pathname) : ''
  const icon = imageExtensions.includes(ext) ? 'image' : 'link-variant'

  return (
    `<a class='bbc-link' href='${url}' target='_blank'>` +
    `<i class='mdi mdi-${icon}'></i> ${text}` +
    `</a>`
  )
}
