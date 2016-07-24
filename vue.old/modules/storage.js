const {localStorage} = window

export function getStorage (): ?Object {
  try {
    const data: ?string = localStorage.getItem('flist-next')
    if (data) {
      const parsed: Object = JSON.parse(data)
      return parsed
    }
    return null
  } catch (e) {
    console.info('Error retrieving storage: ', e)
    clearStorage()
    return null
  }
}

export function saveStorage (data: Object): Object {
  localStorage.setItem('flist-next', JSON.stringify(data))
  return data
}

export function clearStorage () {
  localStorage.removeItem('flist-next')
}

export function initStorage () {
  if (!getStorage()) {
    saveStorage({})
  }
}

export function saveStorageKeys (keys: Object): Object | null {
  const data = getStorage()
  if (data) {
    saveStorage(Object.assign(data, keys))
  }
  return data
}
