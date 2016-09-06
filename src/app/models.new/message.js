import parseBBC from '../parse-bbc'

export function newMessage (sender, message, type) {
  return {
    sender, // Character object
    type,   // either 'chat', 'lfrp', 'self', 'admin', or 'friend'
    message: parseBBC(message),
    originalMessage: message,
    time: Date.now(),
    id: Math.random() * 999999
  }
}
