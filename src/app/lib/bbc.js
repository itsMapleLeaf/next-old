// @flow
import {getProfileURL, getAvatarURL, getExtendedIcon} from '../lib/f-list'
import {parse as parseURL} from 'url'
import {jwerty} from 'jwerty'
import {createParser} from 'bbc.js'
import path from 'path'

const parser = createParser({
  b: { render: text => `<span class="bbc-bold">${text}</span>` },
  i: { render: text => `<span class="bbc-italic">${text}</span>` },
  u: { render: text => `<span class="bbc-underline">${text}</span>` },
  s: { render: text => `<span class="bbc-strike">${text}</span>` },
  sup: { render: text => `<span class="bbc-super">${text}</span>` },
  sub: { render: text => `<span class="bbc-sub">${text}</span>` },
  url: { render: (text, url) => formatLink(url, text) },
  color: {
    render: (text, color) => color ? `<span class="bbc-color-${color}">${text}</span>` : text,
  },
  noparse: {
    render: text => text,
    deep: false,
  },
  icon: { render: name => formatUserIcon(name) },
  eicon: { render: name => formatExtendedIcon(name) },
  user: { render: name => formatUserIcon(name) },
  session: { render: (name, id) => formatPrivateChannel(id, name) },
  channel: { render: name => formatPublicChannel(name) },
})

export function parseBBC(input: string) {
  return parser.parse(input)
}

export function doBBCShortcut(text: string, event: Object) {
  const tag
    = jwerty.is('ctrl+shift+h', event) ? 'sub'
    : jwerty.is('ctrl+shift+j', event) ? 'sup'
    : jwerty.is('ctrl+shift+b', event) ? 'b'
    : jwerty.is('ctrl+shift+i', event) ? 'i'
    : jwerty.is('ctrl+shift+u', event) ? 'u'
    : jwerty.is('ctrl+shift+s', event) ? 's'
    : ''

  if (tag !== '') {
    event.preventDefault()

    const {selectionStart: start, selectionEnd: end} = event.target
    const before = text.substring(0, start)
    const between = text.substring(start, end)
    const after = text.substring(end)
    return `${before}[${tag}]${between}[/${tag}]${after}`
  }
  return text
}

function formatUserIcon(name) {
  const href = getProfileURL(name)
  const avatar = getAvatarURL(name)
  const style = `background-image: url(${avatar})`
  return `<a class='bbc-icon' href='${href}' target='_blank' style='${style}'></a>`
}

function formatExtendedIcon(icon) {
  const iconURL = getExtendedIcon(icon)
  return `<div class='bbc-icon' style='background-image: url(${iconURL})'></div>`
}

function formatPublicChannel(id) {
  return `<a href='#' class='bbc-channel' data-channel='${id}'>` +
    `<i class='mdi mdi-earth'></i> ${id}` +
  '</a>'
}

function formatPrivateChannel(id, name) {
  return `<a href='#' class='bbc-channel' data-channel='${id}'>` +
    `<i class='mdi mdi-key-variant'></i> ${name}</a>`
}

function formatLink(url, text) {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.gif']
  const {pathname} = parseURL(url)
  const ext = pathname ? path.extname(pathname) : ''
  const icon = imageExtensions.includes(ext) ? 'image' : 'link-variant'

  return `<a class='bbc-link' href='${url}' target='_blank'>` +
    `<i class='mdi mdi-${icon}'></i> ${text}</a>`
}
