export type Name = string

type State = {
  currentView: Object,
  loadingMessage: string,

  account: string,
  ticket: string,

  userCharacters: Name[],
  identity: Name
}

const state: State = {
  currentView: null,
  loadingMessage: '',

  account: '',
  ticket: '',

  userCharacters: [],
  identity: ''
}

export { state }
