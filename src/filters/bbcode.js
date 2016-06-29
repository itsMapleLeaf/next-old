function matchTag (tag) {
  return new RegExp(`\\[${tag}\\]([\\s\\S]+?)\\[\\/${tag}\\]`, 'gi')
}

function matchTagWithParam (tag) {
  return new RegExp(`\\[${tag}=(.+?)\\]([\\s\\S]+?)\\[\\/${tag}\\]`, 'gi')
}

function wrapText (tag) {
  return (match, text) => `<${tag}>${text}</${tag}>`
}

export default function parseBBC (input) {
  return input
    // wrap links with [url] tags
    // also account for [url] tags that already exist so we don't double-wrap them
    .replace(/\[url\].+?\[\/url\]|\[url=.+?\].+?\[\/url\]|(https?:\/\/[^\[\]\(\)\s]+)/, (match, url) => {
      if (url) {
        return `[url]${url}[/url]`
      } else {
        return match
      }
    })

    .replace(matchTag('i'), wrapText('em'))
    .replace(matchTag('b'), wrapText('strong'))
    .replace(matchTag('u'), wrapText('u'))
    .replace(matchTag('s'), wrapText('del'))
    .replace(matchTag('sup'), wrapText('sup'))
    .replace(matchTag('sub'), wrapText('small'))
    .replace(matchTag('sub'), wrapText('small'))

    .replace(matchTagWithParam('color'), (match, param, text) => {
      return `<span class="chat-color ${param}">${text}</span>`
    })

    .replace(matchTag('url'), (match, text) => {
      return `<a class="ui link" href="${text}" target="_blank">${text}</a>`
    })

    .replace(matchTagWithParam('url'), (match, param, text) => {
      return `<a class="ui link" href="${param}" target="_blank">${text}</a>`
    })
}
