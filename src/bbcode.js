export default function parseBBC (input) {
  return input.replace(/\[(\w+?)=?(.*?)\](.*?)\[\/\1\]/g, (match, tag, value, content) => {
    if (tag !== 'noparse') {
      content = parseBBC(content)
    } else {
      return content
    }

    switch (tag) {
      case 'i': return `<em>${content}</em>`
      case 'b': return `<strong>${content}</strong>`
      case 'u': return `<u>${content}</u>`
      case 's': return `<del>${content}</del>`
      case 'sup': return `<sup>${content}</sup>`
      case 'sub': return `<small>${content}</small>`
      case 'color': return `<span class="chat-color ${value}">${content}</span>`

      case 'url': {
        let href, text
        if (value.trim() !== '') {
          href = value
          text = content
        } else {
          href = content
          text = content
        }
        return `<a class="ui link" href="${href}" target="_blank">${text}</a>`
      }

      default: return match
    }
  })
}
