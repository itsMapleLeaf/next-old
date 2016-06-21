export function ChannelInfo (id, name, userCount) {
  return {
    id,        // string: channel id used to join/leave
    name,      // string: channel title for display
    userCount, // number: number of characters in the channel
  }
}

export function ChannelState (id, name) {
  return {
    id,                // string: the channel id (either 'channel' or 'name' from the server)
    name,              // string: the channel name (or 'title' from the server)
    status: 'joining', // enum: 'joining' | 'joined' | 'leaving'
    mode: 'both',      // enum: 'both' | 'chat' | 'ads'
    description: '',   // string
    characters: [],    // Character[]
    messages: []       // ChatMessage[]
  }
}

export function Character (name, gender, status = 'online', statusMessage = '') {
  return {
    name,          // string
    gender,        // enum: 'Male' | 'Female' | 'Transgender' | 'Herm' | 'Shemale' | 'Cunt-boy' | 'Male-herm' | 'None'
    status,        // enum: 'online' | 'looking' | 'busy' | 'away' | 'dnd' | 'idle' | 'offline'
    statusMessage, // string

    getProfileURL () {
      return `https://f-list.net/c/${encodeURI(this.name)}`
    }
  }
}

export function ChatMessage (character, message) {
  return {
    character, // Character
    message    // string
  }
}
