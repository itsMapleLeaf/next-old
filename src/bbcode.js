export default function parseBBC(input) {
  return input.replace(/\[(\w+)=?(.*?)\](.*?)\[\/\1\]/g, (match, tag, value, content) => {
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
      case 'sub': return `<sub>${content}</sub>`
      case 'color': return `<span style="color: ${value}">${content}</span>`

      case 'url': {
        if (value.trim() !== '') {
          return `<a href="${value}">${content}</a>`
        } else {
          return `<a href="${content}">${content}</a>`
        }
      }

      default: return content
    }
  })
}
