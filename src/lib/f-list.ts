const ticketEndpoint = 'https://www.f-list.net/json/getApiTicket.php'
const characterListEndpoint = 'https://www.f-list.net/json/api/character-list.php'

export async function fetchTicket(account: string, password: string) {
  const res = await fetch(ticketEndpoint + `?account=${account}&password=${password}`)
  const data = await res.json()
  if (data.ticket) return data.ticket as string
  throw data.error
}

export async function fetchCharacters(account: string, ticket: string) {
  const res = await fetch(characterListEndpoint + `?account=${account}&ticket=${ticket}`)
  const data = await res.json()
  if (data.characters) return data.characters as string[]
  throw data.error
}

export function getProfileURL(name: string) {
  return `https://www.f-list.net/c/${encodeURI(name.toLowerCase())}`
}

export function getAvatarURL(name: string) {
  return `https://static.f-list.net/images/avatar/${encodeURI(name.toLowerCase())}.png`
}

export function getExtendedIcon(icon: string) {
  return `https://static.f-list.net/images/eicon/${icon}.gif`
}
