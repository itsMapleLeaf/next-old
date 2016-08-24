let data = {}
const storageKey = 'flist-next-session'

function load () {
  const loaded = window.localStorage[storageKey]
  if (loaded) {
    return (data = JSON.parse(loaded))
  }
  return null
}

function save () {
  window.localStorage[storageKey] = JSON.stringify(data)
}

function clear () {
  window.localStorage.removeItem(storageKey)
  data = {}
}

export { load, save, clear, data }
