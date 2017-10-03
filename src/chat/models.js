export function ChannelInfo(type, id, title, userCount) {
  return { type, id, title, userCount }
}

export function Channel(id) {
  return {
    id,
    title: id,
    description: '',
    users: [],
    messages: [],
    ops: [],
    mode: 'both',
  }
}

export function Character(name, gender, status, statusMessage = '') {
  return { name, gender, status, statusMessage }
}

export function Message(sender, text, type) {
  return { sender, text, type, date: new Date() }
}

export function PrivateChat(partner) {
  return { partner, messages: [] }
}
