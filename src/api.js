import querystring from 'querystring'

function fetchJSON(url, params) {
  const request = url + '?' + querystring.stringify(params)
  return fetch(request).then(res => res.json())
}

export async function fetchTicket(account, password) {
  const url = 'https://www.f-list.net/json/getApiTicket.php'
  const data = await fetchJSON(url, { account, password })
  if (data.error) throw new Error(data.error)
  return data.ticket
}

export async function fetchCharacterList(account, ticket) {
  const url = 'https://www.f-list.net/json/api/character-list.php'
  const data = await fetchJSON(url, { account, ticket })
  if (data.error) throw new Error(data.error)
  return data.characters
}

export function getAvatarURL(name) {
  const encoded = encodeURI(name.toLowerCase())
  return `https://static.f-list.net/images/avatar/${encoded}.png`
}

export function getProfileURL(name) {
  const encoded = encodeURI(name.toLowerCase())
  return `https://www.f-list.net/c/${encoded}`
}

export function getExtendedIcon(name) {
  return `https://static.f-list.net/images/eicon/${name}.gif`
}
