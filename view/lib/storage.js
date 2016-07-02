const {localStorage: ls} = window
const storageKey = 'fchat-next-storage'

const dataKeys = {
  account: 'account',
  ticket: account => `ticket:${account}`,
  character: account => `character:${account}`,
  channels: (account, character) => `channels:${account}:${character}`
}

class Storage {
  constructor () {
    // clear out old storage implementations and start fresh
    if (ls.getItem(storageKey) == null) {
      ls.clear()
    }
    this.data = JSON.parse(ls.getItem(storageKey) || '{}')
  }

  // storage interface
  get (key, defaultValue) {
    if (this.data[key] == null && defaultValue != null) {
      this.set(key, defaultValue)
    }
    const value = this.data[key]
    return value ? Promise.resolve(value) : Promise.reject(`${key} does not exist in storage`)
  }

  set (key, value) {
    this.data[key] = value
    return this.save().then(() => {
      return Promise.resolve(value)
    })
  }

  save () {
    try {
      ls.setItem(storageKey, JSON.stringify(this.data))
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    }
  }

  // getters
  getAccount () {
    return this.get(dataKeys.account)
  }

  getTicket (account) {
    return this.get(dataKeys.ticket(account))
  }

  getCharacter (account) {
    return this.get(dataKeys.character(account))
  }

  getActiveChannels (account, character) {
    return this.get(dataKeys.channels(account, character))
  }

  // setters
  setAccount (account) {
    return this.set(dataKeys.account, account)
  }

  setTicket (account, ticket) {
    return this.set(dataKeys.ticket(account), ticket)
  }

  setCharacter (account, character) {
    return this.set(dataKeys.character(account), character)
  }

  setActiveChannels (account, character, channels) {
    return this.set(dataKeys.channels(account, character), channels)
  }
}

export default new Storage()
