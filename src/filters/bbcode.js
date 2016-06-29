const regexp = /\[(\w+?)=?([^\]]*)\]([\s\S]+?)\[\/\1\]|(https?:\/\/[^\[\]\(\)\s]+)/gi

export default function parseBBC (input) {
  return input.replace(regexp, (match, tag, param, content, url) => {
    if (url) {
      param = content = url
      tag = 'url'
    } else if (tag === 'noparse') {
      return content
    } else if (tag !== 'url' && regexp.test(content)) {
      content = parseBBC(content)
    }

    switch (tag) {
      case 'i': return `<em>${content}</em>`
      case 'b': return `<strong>${content}</strong>`
      case 'u': return `<u>${content}</u>`
      case 's': return `<del>${content}</del>`
      case 'sup': return `<sup>${content}</sup>`
      case 'sub': return `<small>${content}</small>`

      case 'color': return `<span class="chat-color ${param}">${content}</span>`

      case 'url': {
        if (param) {
          return `<a class="ui link" href="${param}">${content}</a>`
        } else {
          return `<a class="ui link" href="${content}">${content}</a>`
        }
      }

      default: return match
    }
  })
}
