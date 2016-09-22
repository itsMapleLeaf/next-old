// @flow
import {getProfileURL, getAvatarURL, getExtendedIcon} from '../lib/f-list'
import {parse as parseURL} from 'url'
import path from 'path'

const bbcExpression = /\[(\w+?)=?([^\]]*)\]([\s\S]+?)\[\/\1\]|(https?:\/\/[^\[\]\(\)\s]+)/gi // lol
const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.gif']

export function parseBBC(input: string) {
  return input.replace(bbcExpression, (match, tag, value, text, url) => {
    if (url) {
      tag = 'url'
      value = text = url
    } else if (tag === 'noparse') {
      return text
    } else if (tag !== 'url') {
      text = parseBBC(text)
    }

    const tags = {
      i: () => `<em>${text}</em>`,
      b: () => `<strong>${text}</strong>`,
      u: () => `<u>${text}</u>`,
      s: () => `<del>${text}</del>`,
      sup: () => `<sup>${text}</sup>`,
      sub: () => `<small>${text}</small>`,
      color: () => formatColor(value, text),
      url: () => formatURL(value, text),
      channel: () => formatPublicChannelLink(text),
      session: () => formatPrivateChannelLink(text, value),
      icon: () => formatUserIcon(text),
      user: () => formatUserIcon(text),
      eicon: () => formatExtendedIcon(text),
    }

    return tags[tag] ? tags[tag]() : match
  })
}

function formatColor(color, text) {
  return `<span class="chat-color-${color}">${text}</span>`
}

function formatURL(url, text) {
  const href = url || text
  const {hostname, pathname} = (parseURL(url): Object)
  const ext = path.extname(pathname)
  const icon = imageExtensions.includes(ext) ? 'image' : 'link-variant'
  return (
    `<a class="link" href="${href}" target="_blank" title="${hostname}">` +
      `<i class='mdi mdi-${icon}'></i> ${text}` +
    '</a>'
  )
}

function formatPublicChannelLink(channel) {
  return (
    `<a href='#' class='link' data-join-channel='${channel}'>` +
      `<i class='mdi mdi-earth'></i> ${channel}` +
    '</a>'
  )
}

function formatPrivateChannelLink(id, name) {
  return (
    `<a href='#' class='link' data-join-channel="${id}">` +
      `<i class='mdi mdi-key-variant'></i> ${name}` +
    '</a>'
  )
}

function formatUserIcon(name) {
  const href = getProfileURL(name)
  const avatar = getAvatarURL(name)
  const style = `background-image: url(${avatar})`
  return (
    `<a class='chat-icon link' href='${href}' target='_blank' style='${style}'></a>`
  )
}

function formatExtendedIcon(icon) {
  const iconURL = getExtendedIcon(icon)
  return (
    `<div class='chat-icon link' style='background-image: url(${iconURL})'></div>`
  )
}
