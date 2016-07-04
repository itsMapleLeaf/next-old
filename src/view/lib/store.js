import type {AppState, Character, CharacterName} from './types.new'
import type {Event} from './events.new'

class Store {
  state: AppState

  constructor () {
    this.state = {
      auth: { account: '', ticket: '' },

      user: {
        character: '',
        characterList: [],
        status: { state: 'online', message: '' }
      },

      chat: {
        characters: [],
        friends: [],
        bookmarks: [],
        ignored: [],
        admins: [],
        publicChannels: [],
        privateChannels: [],
        activeChats: [],
        serverVariables: {}
      },

      event: {}
    }
  }

  dispatchEvent (event: Event) {
    this.state.event = event
  }

  setAuthData (account: string, ticket: string) {
    this.state.auth.account = account
    this.state.auth.ticket = ticket
  }

  setUserCharacter (character: CharacterName) {
    this.state.user.character = character
  }

  setUserCharacterList (list: CharacterName[]) {
    this.state.user.characterList = list
  }

  setCharacterList (list: Character[]) {
    this.state.chat.characters = list
  }
}

export default new Store()
