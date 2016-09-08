export function Character (name, gender, status = 'online', statusmsg = '') {
  return { name, gender, status, statusmsg }
}

export function Message (sender, message, type) {
  return {
    sender, // character name
    type,   // either 'chat', 'lfrp', 'self', 'admin', or 'friend'
    message,
    time: Date.now()
  }
}

export function Channel (id, name) {
  return {
    id,
    name,
    description: '',
    mode: 'both', // either 'both', 'chat', or 'ads'
    characters: [],
    ops: []
  }
}

export function PrivateChat (partner) {
  return {
    partner,
    messages: []
  }
}
