import * as querystring from "querystring"

function fetchJSON(url: string, params: object = {}) {
  const request = url + "?" + querystring.stringify(params)
  return fetch(request, { method: "POST" }).then(res => res.json())
}

export async function fetchTicket(account: string, password: string) {
  const url = "https://www.f-list.net/json/getApiTicket.php"
  const data = await fetchJSON(url, { account, password })
  if (data.error) throw new Error(data.error)
  return data.ticket as string
}

export async function fetchCharacterList(account: string, ticket: string) {
  const url = "https://www.f-list.net/json/api/character-list.php"
  const data = await fetchJSON(url, { account, ticket })
  if (data.error) throw new Error(data.error)
  return data.characters as string[]
}

function encodeLower(str: string) {
  return encodeURI(str.toLowerCase())
}

export function getAvatarURL(name: string) {
  return `https://static.f-list.net/images/avatar/${encodeLower(name)}.png`
}

export function getProfileURL(name: string) {
  return `https://www.f-list.net/c/${encodeLower(name)}`
}

export function getExtendedIcon(name: string) {
  return `https://static.f-list.net/images/eicon/${encodeLower(name)}.gif`
}
