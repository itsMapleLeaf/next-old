// @flow
import {getProfileURL, getAvatarURL} from '../lib/f-list'
import {parse as parseURL} from 'url'
import path from 'path'

const bbcExpression = /\[(\w+?)=?([^\]]*)\]([\s\S]+?)\[\/\1\]|(https?:\/\/[^\[\]\(\)\s]+)/gi // lol
const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.gif']

export function parseBBC (input: string) {
  return input.replace(bbcExpression, (match, tag, value, text, url) => {
    if (url) {
      tag = 'url'
      value = text = url
    } else if (tag === 'noparse') {
      return text
    } else if (tag !== 'url') {
      text = parseBBC(text)
    }

    switch (tag) {
      case 'i': return `<em>${text}</em>`
      case 'b': return `<strong>${text}</strong>`
      case 'u': return `<u>${text}</u>`
      case 's': return `<del>${text}</del>`
      case 'sup': return `<sup>${text}</sup>`
      case 'sub': return `<small>${text}</small>`
      case 'color': return formatColor(value, text)
      case 'url': return formatURL(value, text)
      case 'channel': return formatPublicChannelLink(text)
      case 'session': return formatPrivateChannelLink(text, value)
      case 'icon':
      case 'user':
      case 'eicon': return formatUserIcon(text)
      default: return match
    }
  })
}

function formatColor (color, text) {
  return `<span class="chat-color ${color}">${text}</span>`
}

function formatURL (url, text) {
  const href = url || text
  const {hostname, pathname} = (parseURL(url): Object)
  const ext = path.extname(pathname)
  const icon = imageExtensions.includes(ext) ? 'image' : 'link-variant'
  return (
    `<a class="ui-link" href="${href}" target="_blank" title="${hostname}">` +
      `<i class='mdi mdi-${icon}'></i> ${text}` +
    `</a>`
  )
}

function formatPublicChannelLink (channel) {
  return (
    `<a href='#' class='ui-link' data-join-channel='${channel}'>` +
      `<i class='mdi mdi-earth'></i> ${channel}` +
    `</a>`
  )
}

function formatPrivateChannelLink (id, name) {
  return (
    `<a href='#' class='ui-link' data-join-channel="${id}">` +
      `<i class='mdi mdi-key-variant'></i> ${name}` +
    `</a>`
  )
}

function formatUserIcon (user) {
  return (
    `<a href="${getProfileURL(user)}" class="ui-link">` +
      `<img src="${getAvatarURL(user)}" style="width: 50px; height: auto" />` +
    `</a>`
  )
}
