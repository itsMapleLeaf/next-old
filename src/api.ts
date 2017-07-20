const ticketEndpoint = 'https://www.f-list.net/json/getApiTicket.php'
const characterListEndpoint = 'https://www.f-list.net/json/api/character-list.php'

export async function fetchTicket(account: string, password: string) {
  const query = `?account=${account}&password=${password}`
  const res = await fetch(ticketEndpoint + query)
  const data = await res.json()
  if (data.error) throw data.error
  return data.ticket as string
}

export async function fetchCharacterList(account: string, ticket: string) {
  const query = `?account=${account}&ticket=${ticket}`
  const res = await fetch(characterListEndpoint + query)
  const data = await res.json()
  if (data.error) throw data.error
  return data.characters as string[]
}
