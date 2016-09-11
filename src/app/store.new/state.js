// @flow
import type {
  Character, Name, Status,
  Channel, PrivateChat, Chat,
  SocketState, ChannelInfo,
  Bubble
} from '../types'

type NameMap = {
  [name: Name]: boolean
}

type CharacterMap = {
  [name: Name]: Character
}

type RelationshipMap = {
  [them: Name]: Name[]
}

class State {
  // ui overlays
  overlays: string[] = []

  // message bubbles that show up in the bottom right
  messageBubbles: Bubble[] = []

  // list of messages
  messageLog: string[] = []

  // the number of unread messages we have
  unreadMessageCount: number = 0

  // socket connection state
  // either: offline, connecting, online, identified
  socketState: SocketState = 'offline'

  // auth information
  account: string = ''
  ticket: string = ''

  // our current identity
  identity: Name = ''

  // our status
  status: Status = 'online'
  statusmsg: string = ''

  // list of user characters
  characters: Name[] = []

  // current character opened on the character menu
  characterMenuFocus: Character

  // a map of characters to lists of user's friends they're with
  friends: RelationshipMap = {}

  // our bookmarks by name
  bookmarks: NameMap = {}

  // ignored characters by name
  ignored: NameMap = {}

  // global admins by name
  admins: NameMap = {}

  // a map of all online characters, name to Character object
  onlineCharacters: CharacterMap = {}

  // list of available channels
  channelList: ChannelInfo[] = []

  // channel states
  channels: { [id: string]: Channel } = {}

  // private chat states
  privateChats: { [partner: Name]: PrivateChat } = {}

  // list of active chats
  activeChats: Chat[] = []

  // index of the current active chat
  currentChatIndex: number = 0

  getCurrentChat (): ?Chat {
    return this.activeChats[this.currentChatIndex]
  }

  // getter for the user's character object
  getUserCharacter (): Character {
    return this.onlineCharacters[this.identity]
  }
}

export default new State()
