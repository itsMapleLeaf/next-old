export default {
  // ui overlays
  overlays: [],

  messageBubbles: [],
  messageLog: [],
  unreadMessageCount: 0,

  // socket connection state
  // either: offline, connecting, online, identified
  socketState: 'offline',

  // auth information
  account: '',
  ticket: '',

  // our current identity
  identity: '',

  // our status
  status: 'online',
  statusmsg: '',

  // our list of characters
  characters: [],

  // a map of characters to friends they're with
  // e.g.: { "their character": ["your character 1", "your character 2"] }
  friends: {},

  // our bookmarks by name
  bookmarks: {},

  // ignored characters by name
  ignored: {},

  // global admins by name
  admins: {},

  // a map of all online characters, name to Character object
  onlineCharacters: {},

  // list of available channels
  // format: { id: channelID, name: channelTitle, users: numberOfCharacters }
  channelList: [],

  // list of all active chats, for ordering
  // activeChats: [],

  // index of the current active room
  // currentChatIndex: 0,

  // map of active channels { channelID => channel object }
  activeChannels: {},

  // map of active private chats { partner name => private chat object }
  activePrivateChats: {},

  // current character opened on the character menu
  characterMenuFocus: '',

  // getter for the current room
  // get currentChat () {
  //   const index = clamp(this.currentRoomIndex, 0, this.rooms.length - 1)
  //   return this.rooms[index]
  // },

  // getter for the user's character object
  get userCharacter () {
    return this.onlineCharacters[this.identity]
  }
}
