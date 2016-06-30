// enums
export const ChannelStatus = {
  left: 0,
  joining: 1,
  joined: 2,
  leaving: 3
}

export const ChannelMode = {
  both: 0,
  chat: 1,
  ads: 2
}

export const Gender = {
  'Male': 0,
  'Female': 1,
  'Transgender': 2,
  'Herm': 3,
  'Shemale': 4,
  'Cunt-boy': 5,
  'Male-herm': 6,
  'None': 7
}

export const UserStatus = {
  online: 'Online',
  looking: 'Looking',
  busy: 'Busy',
  away: 'Away',
  dnd: 'DND',
  idle: 'Idle',
  offline: 'Offline'
}

// structs / object types
// TODO: add field for channel type (private or public)
export function ChannelInfo (id, name, userCount) {
  return {
    id,        // string: channel id used to join/leave
    name,      // string: channel title for display
    userCount  // number: number of characters in the channel
  }
}

export function ChannelState (id, name = id) {
  return {
    id,                        // string: the channel id (either 'channel' or 'name' from the server)
    name,                      // string: the channel name (or 'title' from the server)
    mode: ChannelMode.both,    // ChannelMode
    description: '',           // string
    characters: [],            // Character[]
    messages: [],              // ChatMessage[]
    status: ChannelStatus.left // ChannelStatus
  }
}

export function PrivateChatState (character) {
  return {
    character,   // Character
    messages: [] // ChatMessage[]
  }
}

export function Character (name, gender, status = UserStatus.online, statusMessage = '') {
  return {
    name,          // string
    gender,        // Gender
    status,        // UserStatus
    statusMessage  // string
  }
}

// TODO: add time field
export function ChatMessage (character, message) {
  return {
    character, // Character
    message    // string
  }
}