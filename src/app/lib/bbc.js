// @flow
import {getProfileURL, getAvatarURL, getExtendedIcon} from '../lib/f-list'
import {parse as parseURL} from 'url'
import {jwerty} from 'jwerty'
import path from 'path'

export function parseBBC(input: string): string {
  input = input.replace(/\b((?:http)(?:s)?(?::\/\/)[^\s\}\]\)]+)/gi, (match, url, offset) => {
    const behind = input.substring(offset - 5, offset)
    if (behind !== '[url]' && behind !== '[url=') {
      return formatLink(url, url)
    }
    return match
  })

  const tags = {
    i: /(?:\[i])([^]*?)(?:\[\/i])/gi,
    b: /(?:\[b])([^]*?)(?:\[\/b])/gi,
    u: /(?:\[u])([^]*?)(?:\[\/u])/gi,
    s: /(?:\[s])([^]*?)(?:\[\/s])/gi,
    sup: /(?:\[sup])([^]*?)(?:\[\/sup])/gi,
    sub: /(?:\[sub])([^]*?)(?:\[\/sub])/gi,
    color: /(?:\[color=)([a-z]+)(?:])([^]*?)(?:\[\/color])/gi,
    url: /(?:\[url])([^]*?)(?:\[\/url])/gi,
    urlhref: /(?:\[url=)(.+?)(?:])([^]*?)(?:\[\/url])/gi,
    channel: /(?:\[channel])([^]+?)(?:\[\/channel])/gi,
    session: /(?:\[session=)(.+?)(?:])([^]*)(?:\[\/session])/gi,
    icon: /(?:\[icon])(.+?)(?:\[\/icon])/gi,
    user: /(?:\[user])(.+?)(?:\[\/user])/gi,
    eicon: /(?:\[eicon])(.+?)(?:\[\/eicon])/gi,
  }

  const replacers = {
    i: (_, text) => `<span class='bbc-italic'>${parseBBC(text)}</span>`,
    b: (_, text) => `<span class='bbc-bold'>${parseBBC(text)}</span>`,
    u: (_, text) => `<span class='bbc-underline'>${parseBBC(text)}</span>`,
    s: (_, text) => `<span class='bbc-strike'>${parseBBC(text)}</span>`,
    sup: (_, text) => `<span class='bbc-super'>${parseBBC(text)}</span>`,
    sub: (_, text) => `<span class='bbc-sub'>${parseBBC(text)}</span>`,
    color: (_, color, text) => `<span class='bbc-color-${color}'>${parseBBC(text)}</span>`,
    url: (_, url) => formatLink(url, url),
    urlhref: (_, url, text) => formatLink(url, text),
    channel: (_, channel) => formatPublicChannel(channel),
    session: (_, name, id) => formatPrivateChannel(id, name),
    icon: (_, user) => formatUserIcon(user),
    user: (_, user) => formatUserIcon(user),
    eicon: (_, icon) => formatExtendedIcon(icon),
  }

  for (const tag in tags) {
    const exp = tags[tag]
    const replacer = replacers[tag]
    input = input.replace(exp, replacer)
  }

  return input
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
