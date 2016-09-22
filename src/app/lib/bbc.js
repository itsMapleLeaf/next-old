// @flow
import {getProfileURL, getAvatarURL, getExtendedIcon} from '../lib/f-list'
import {parse as parseURL} from 'url'
import path from 'path'

// const bbcExpression = /\[(\w+?)=?([^\]]*)\]([\s\S]+?)\[\/\1\]|(https?:\/\/[^\[\]\(\)\s]+)/gi // lol
//
// export function parseBBC(input: string) {
//   return input.replace(bbcExpression, (match, tag, value, text, url) => {
//     if (url) {
//       tag = 'url'
//       value = text = url
//     } else if (tag === 'noparse') {
//       return text
//     } else if (tag !== 'url') {
//       text = parseBBC(text)
//     }
//
//     const tags = {
//       i: () => `<em>${text}</em>`,
//       b: () => `<strong>${text}</strong>`,
//       u: () => `<u>${text}</u>`,
//       s: () => `<del>${text}</del>`,
//       sup: () => `<sup>${text}</sup>`,
//       sub: () => `<small>${text}</small>`,
//       color: () => formatColor(value, text),
//       url: () => formatURL(value, text),
//       channel: () => formatPublicChannelLink(text),
//       session: () => formatPrivateChannelLink(text, value),
//       icon: () => formatUserIcon(text),
//       user: () => formatUserIcon(text),
//       eicon: () => formatExtendedIcon(text),
//     }
//
//     return tags[tag] ? tags[tag]() : match
//   })
// }

export function parseBBC(input: string): string {
  input = input.replace(/\b((?:http)(?:s)?(?::\/\/)[^\s\}\]\)]+)/gi, (match, url, offset) => {
    const behind = input.substring(offset - 5, offset)
    console.log(behind)
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
