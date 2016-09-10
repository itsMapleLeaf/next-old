// @flow
export function newCharacter (
  name: Name,
  gender: Gender,
  status?: Status = 'online',
  statusmsg?: string = ''
): Character {
  return { name, gender, status, statusmsg }
}

export function newMessage (
  sender: Character,
  message: string,
  type: MessageType
): Message {
  return { sender, type, message, time: Date.now() }
}

export function newChannel (id: string, name: string): Channel {
  return {
    id,
    name,
    description: '',
    mode: 'both', // either 'both', 'chat', or 'ads'
    characters: [],
    ops: []
  }
}

export function newPrivateChat (partner: Character): PrivateChat {
  return {
    partner,
    messages: []
  }
}
