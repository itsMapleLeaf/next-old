export async function fetchTicket(account, password) {
  const url = `https://www.f-list.net/json/getApiTicket.php`
  const query = `?account=${account}&password=${password}`
  const data = await fetch(url + query).then(res => res.json())
  if (data.error) throw new Error(data.error)
  return data.ticket
}

export async function fetchCharacterList(account, ticket) {
  const url = `https://www.f-list.net/json/api/character-list.php`
  const query = `?account=${account}&ticket=${ticket}`
  const data = await fetch(url + query).then(res => res.json())
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
