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
        if (value.trim() !== '') {
          return `<a href="${value}" target="_blank">${content}</a>`
        } else {
          return `<a href="${content}" target="_blank">${content}</a>`
        }
      }

      default: return content
    }
  })
}
