import type {Character, CharacterName, CharacterStatus} from './character'
import type {FriendInfo, ChannelInfo, ActiveChatState} from './chat'
import type {Event} from './event'

export type AppState = {
  auth: {
    account: string,
    ticket: string
  },

  user: {
    character: CharacterName,
    characterList: CharacterName[],
    status: CharacterStatus
  },

  chat: {
    characters: Character[],
    friends: FriendInfo[],
    bookmarks: Character[],
    ignored: Character[],
    admins: Character[],
    publicChannels: ChannelInfo[],
    privateChannels: ChannelInfo[],
    activeChats: ActiveChatState[],
    serverVariables: { [key: string]: number }
  },

  event: Event
}

export type LoginData = {
  account: string,
  ticket: string,
  friends: FriendInfo[],
  characters: CharacterName[],
  bookmarks: CharacterName[]
}
