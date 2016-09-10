// @flow
import type {
  Character, Name, Status,
  Channel, PrivateChat,
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
  [you: Name]: Name[]
}

type ChannelMap = {
  [id: string]: Channel
}

type PrivateChatMap = {
  [partner: Name]: PrivateChat
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

  // a map of characters to friends they're with
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

  // list of all active chats, for ordering
  // activeChats: []

  // index of the current active room
  // currentChatIndex: 0

  // map of active channels
  activeChannels: ChannelMap = {}

  // map of active private chats { partner name => private chat object }
  activePrivateChats: PrivateChatMap = {}

  // current character opened on the character menu
  characterMenuFocus: Name = ''

  // getter for the current room
  // get currentChat () {
  //   const index = clamp(this.currentRoomIndex, 0, this.rooms.length - 1)
  //   return this.rooms[index]
  // }

  // getter for the user's character object
  getUserCharacter (): Character {
    return this.onlineCharacters[this.identity]
  }
}

export default new State()
