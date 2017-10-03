import querystring from 'querystring'

function fetchJSON(url: string, params: object = {}) {
  const request = url + '?' + querystring.stringify(params)
  return fetch(request, { method: 'POST' }).then(res => res.json())
}

export async function fetchTicket(account: string, password: string) {
  const url = 'https://www.f-list.net/json/getApiTicket.php'
  const data = await fetchJSON(url, { account, password })
  if (data.error) throw new Error(data.error)
  return data.ticket
}

export async function fetchCharacterList(account: string, ticket: string) {
  const url = 'https://www.f-list.net/json/api/character-list.php'
  const data = await fetchJSON(url, { account, ticket })
  if (data.error) throw new Error(data.error)
  return data.characters
}
