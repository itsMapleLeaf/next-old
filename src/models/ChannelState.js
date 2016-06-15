export default function ChannelState (id, name) {
  return {
    id,                // string: the channel id (either 'channel' or 'name' from the server)
    name,              // string: the channel name (or 'title' from the server)
    status: 'joining', // enum: 'joining' | 'joined' | 'leaving'
    mode: 'both',      // enum: 'both' | 'chat' | 'ads'
    description: '',   // string
    characters: [],    // Character[] (see models/Character.js)
    messages: []       // ChatMessage[] (see models/ChatMessage.js)
  }
}
