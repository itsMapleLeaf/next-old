import {getProfileURL, getAvatarURL} from './flist'
import urllib from 'url'
import path from 'path'

const regexp = /\[(\w+?)=?([^\]]*)\]([\s\S]+?)\[\/\1\]|(https?:\/\/[^\[\]\(\)\s]+)/gi // lol

export function bbcode (input: string): string {
  return input.replace(regexp, (match, tag, value, text, url) => {
    if (url) {
      tag = 'url'
      value = text = url
    } else if (tag === 'noparse') {
      return text
    } else if (tag !== 'url' && regexp.test(text)) {
      text = bbcode(text)
    }

    switch (tag) {
      case 'i': return `<em>${text}</em>`
      case 'b': return `<strong>${text}</strong>`
      case 'u': return `<u>${text}</u>`
      case 's': return `<del>${text}</del>`
      case 'sup': return `<sup>${text}</sup>`
      case 'sub': return `<small>${text}</small>`

      case 'color': return `<span class="chat-color ${value}">${text}</span>`

      case 'url':
        const href = value || text
        const {hostname, pathname} = urllib.parse(href)
        const ext = path.extname(pathname)
        const icon = ['.png', '.jpg', '.jpeg', '.svg', '.gif'].includes(ext) ? 'image' : 'link-variant'
        return `<a class="ui-link" href="${href}" target="_blank" title="${hostname}"><i class='mdi mdi-${icon}'></i> ${text}</a>`

      case 'channel':
        return `<a href='#' class='ui-link' data-join-channel='${text}'><i class='mdi mdi-earth'></i> ${text}</a>`

      case 'session':
        return `<a href='#' class='ui-link' data-join-channel='${text}'><i class='mdi mdi-key-variant'></i> ${value}</a>`

      case 'icon':
      case 'user':
        return `<a href="${getProfileURL(text)}" class="ui-link"><img src="${getAvatarURL(text)}" style="width: 50px; height: auto" /></a>`

      default:
        return match
    }
  })
}
