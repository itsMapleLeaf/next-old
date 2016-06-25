import {
  Character,
  ChannelState,
  ChannelStatus,
  ChatMessage,
  PrivateChatState
} from './types'

class State {
  constructor () {
    this.data = {
      userData: {
        account: '',
        character: '',
        bookmarks: [],
        characters: [],
        default_character: '',
        friends: [],
        ticket: ''
      },

      publicChannels: [],   // ChannelInfo[]
      privateChannels: [],  // ChannelInfo[]
      channels: {},         // channelID (string) => ChannelState
      privateChats: {},     // characterName (string) => PrivateChatState
      serverVariables: {},  // variableName (string) => number
      onlineCharacters: {}, // characterName (string) => Character
      ignored: [],          // string[]
      admins: []            // string[]
    }

    const account = window.localStorage.getItem('fchat-next:account')
    if (account) {
      const ticket = window.localStorage.getItem(`fchat-next:ticket:${account}`)
      if (ticket) {
        Object.assign(this.data.userData, { account, ticket })
      }
      const character = window.localStorage.getItem(`fchat-next:character:${account}`)
      if (character) {
        this.data.userData.default_character = character
      }
    }
  }

  // getters
  getUserData () {
    return Object.assign({}, this.data.userData)
  }

  getChannel (id) {
    let channel = this.data.channels[id]
    if (!channel) {
      channel = this.data.channels[id] = ChannelState(id)
    }
    return channel
  }

  getPrivateChat (partner) {
    let chat = this.data.privateChats[partner]
    if (!chat) {
      chat = this.data.privateChats[partner] = PrivateChatState(partner)
    }
    return chat
  }

  getCharacter () {
    return this.data.userData.character
  }

  getChannelStatus (id) {
    if (!this.data.channels[id]) {
      return ChannelStatus.left
    }
    return this.data.channels[id].status
  }

  getPublicChannelList () {
    return this.data.publicChannels.slice()
  }

  getPrivateChannelList () {
    return this.data.privateChannels.slice()
  }

  getUserChannels () {
    return this.data.channels.slice()
  }

  // setters
  setAccount (account) {
    this.data.userData.account = account
    window.localStorage.setItem('fchat-next:account', account)
  }

  setUserData (userData) {
    const { account, ticket } = Object.assign(this.data.userData, userData)
    window.localStorage.setItem(`fchat-next:ticket:${account}`, ticket)
  }

  setCharacter (charname) {
    this.data.userData.character = charname
    window.localStorage.setItem(`fchat-next:character:${this.data.userData.account}`, charname)
  }

  setUserCharacterList (characters) {
    this.data.userData.characters = characters
  }

  setFriendsList (friends) {
    this.data.userData.friends = friends
  }

  setBookmarkList (bookmarks) {
    this.data.userData.bookmarks = bookmarks
  }

  setIgnoreList (names) {
    this.data.ignored = names
  }

  setAdminList (names) {
    this.data.admins = names
  }

  setServerVariable (key, value) {
    this.data.serverVariables[key] = value
  }

  hashCharacters (chars) {
    for (let [name, gender, status, statusMessage] of chars) {
      this.data.onlineCharacters[name] = Character(name, gender, status, statusMessage)
    }
  }

  addCharacter (name, gender) {
    this.data.onlineCharacters[name] = Character(name, gender)
  }

  removeCharacter (name) {
    delete this.data.onlineCharacters[name]
  }

  setCharacterStatus (name, status, statusMessage) {
    const char = this.data.onlineCharacters[name]
    if (char) {
      char.status = status
      char.statusMessage = statusMessage
    }
  }

  setPublicChannelList (channels) {
    this.data.publicChannels = channels
  }

  setPrivateChannelList (channels) {
    this.data.privateChannels = channels
  }

  setChannelName (id, name) {
    this.getChannel(id).name = name
  }

  setChannelStatus (id, status) {
    this.getChannel(id).status = status
  }

  setChannelMode (id, mode) {
    this.getChannel(id).mode = mode
  }

  setChannelCharacters (id, names) {
    const characters = []
    for (let name of names) {
      const char = this.data.onlineCharacters[name]
      if (char) {
        characters.push(char)
      }
    }

    this.getChannel(id).characters = characters
  }

  setChannelDescription (id, description) {
    this.getChannel(id).description = description
  }

  addChannelCharacter (id, name) {
    const channel = this.getChannel(id)
    const char = this.data.onlineCharacters[name]
    if (char) {
      channel.characters.push(char)
    }
  }

  removeChannelCharacter (id, name) {
    const channel = this.getChannel(id)
    channel.characters = channel.characters.filter(char => char.name !== name)
  }

  addChannelMessage (id, name, message) {
    const channel = this.getChannel(id)
    const char = this.data.onlineCharacters[name]
    if (char) {
      channel.messages.push(ChatMessage(char, message))
    }
  }

  addPrivateMessage (partner, name, message) {
    const chat = this.getPrivateChat(partner)
    const char = this.data.onlineCharacters[name]
    if (char) {
      chat.messages.push(ChatMessage(char, message))
    }
  }
}

export default new State()
