export default {
  data: {},
  storageKey: 'flist-next-session',

  load () {
    const data = window.localStorage[this.storageKey]
    if (data) {
      return (this.data = JSON.parse(data))
    }
    return null
  },

  save () {
    window.localStorage[this.storageKey] = JSON.stringify(this.data)
  },

  clear () {
    window.localStorage.removeItem(this.storageKey)
    this.data = {}
  }
}
