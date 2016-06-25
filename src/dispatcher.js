export default {
  listeners: {},

  listen (event, callback) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(callback)
  },

  stopListening (event, callback) {
    const listeners = this.listeners[event]
    if (listeners) {
      this.listeners[event] = listeners.filter(cb => cb !== callback)
    }
  },

  notify (event, params) {
    const listeners = this.listeners[event]
    for (let callback of listeners) {
      callback(params)
    }
  }
}
