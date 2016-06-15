export default function ChannelState (id, name) {
  return {
    id, name,
    status: 'joining',
    mode: 'both',
    description: '',
    characters: [],
    messages: []
  }
}
