import {getProfileURL, getAvatarURL} from './flist'

const regexp = /\[(\w+?)=?([^\]]*)\]([\s\S]+?)\[\/\1\]|(https?:\/\/[^\[\]\(\)\s]+)/gi // lol

export function bbcode (input: string): string {
  return input.replace(regexp, (match, tag, value, text, url) => {
    if (url) {
      value = text = url
      tag = 'url'
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

      case 'url': {
        if (value) {
          return `<a class="ui-link" href="${value}" target="_blank">${text}</a>`
        } else {
          return `<a class="ui-link" href="${text}" target="_blank">${text}</a>`
        }
      }

      case 'channel':
        return `<a href='#' class='ui-link' data-toggle-channel='${text}'><i class='mdi mdi-earth'></i> ${text}</a>`

      case 'session':
        return `<a href='#' class='ui-link' data-toggle-channel='${text}'><i class='mdi mdi-key-variant'></i> ${value}</a>`

      case 'icon':
      case 'user':
        return `<a href="${getProfileURL(text)}" class="ui-link"><img src="${getAvatarURL(text)}" /></a>`

      default:
        return match
    }
  })
}
