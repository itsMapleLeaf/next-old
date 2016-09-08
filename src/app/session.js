const {localStorage} = window
const storageKey = `flist-next-session`

function loadStorage () {
  return JSON.parse(localStorage[storageKey])
}

function saveStorage (data) {
  localStorage[storageKey] = JSON.stringify(data)
}

export function isStorageEnabled () {
  return localStorage[storageKey] != null
}

export function enableStorage () {
  if (!isStorageEnabled()) {
    saveStorage({})
  }
}

export function disableStorage () {
  delete localStorage[storageKey]
}

export function getStorageItem (key) {
  if (isStorageEnabled()) {
    return loadStorage()[key]
  }
  return null
}

export function setStorageItem (key, value) {
  if (isStorageEnabled()) {
    const data = loadStorage()
    data[key] = value
    saveStorage(data)
    return true
  }
  return false
}
