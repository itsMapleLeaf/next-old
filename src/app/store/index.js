type Name = string

class State {
  account: string = ''
  ticket: string = ''

  userCharacters: Name[] = []
  identity: Name = ''
}

class Store {
  state = new State()
  history = []

  set (key, value) {
    this.state[key] = value
    this.history.push({ key, value })
  }
}

const store = new Store()
const state = store.state

export { store, state }
