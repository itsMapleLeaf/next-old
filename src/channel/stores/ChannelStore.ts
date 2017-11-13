import { action, observable } from 'mobx'

import { Channel } from 'src/channel/models/Channel'
import { StoredValue } from 'src/common/util/storage'
import { ChatMessage } from 'src/chat/models/ChatMessage'

export type ChannelID = string

type StoredJoinedChannels = Dictionary<string[]>

export class ChannelStore {
  @observable private channels = new Map<ChannelID, Channel>()
  @observable private joinedChannels = new Map<ChannelID, true>()
  private storedChannels = new StoredValue<StoredJoinedChannels>('ChannelStore_joinedChannels')

  @action
  getChannel(id: ChannelID) {
    let channel = this.channels.get(id)
    if (!channel) {
      channel = new Channel(id)
      this.channels.set(id, channel)
    }
    return channel
  }

  @action
  addJoinedChannel(id: ChannelID) {
    this.joinedChannels.set(id, true)
  }

  @action
  removeJoinedChannel(id: ChannelID) {
    this.joinedChannels.delete(id)
  }

  @action
  handleSocketCommand(cmd: string, params: any) {
    if (cmd === 'FLN') {
      this.channels.forEach(channel => {
        channel.removeUser(params.character)
      })
    }

    if (cmd === 'JCH') {
      const channel = this.getChannel(params.channel)
      const name = params.character.identity
      channel.title = params.title
      channel.addUser(name)
    }

    if (cmd === 'LCH') {
      const channel = this.getChannel(params.channel)
      channel.removeUser(params.character)
    }

    if (cmd === 'ICH') {
      const channel = this.getChannel(params.channel)
      const userData = params.users as Array<{ identity: string }>
      channel.setUsers(userData.map(user => user.identity))
      channel.mode = params.mode
    }

    if (cmd === 'CDS') {
      const channel = this.getChannel(params.channel)
      channel.description = params.description
    }

    if (cmd === 'COL') {
      const channel = this.getChannel(params.channel)
      channel.description = params.oplist
    }

    if (cmd === 'MSG') {
      const channel = this.getChannel(params.channel)
      channel.messages.push(new ChatMessage('normal', params.message, params.character))
    }

    if (cmd === 'LRP') {
      const channel = this.getChannel(params.channel)
      channel.messages.push(new ChatMessage('lfrp', params.message, params.character))
    }
  }

  getJoinedChannelIDs() {
    return Array.from(this.joinedChannels.keys())
  }

  getJoinedChannels() {
    return this.getJoinedChannelIDs().map(id => this.getChannel(id))
  }

  isJoined(id: string) {
    return this.joinedChannels.has(id)
  }

  async saveJoinedChannels(character: string): Promise<void> {
    const channelIDs = this.getJoinedChannels().map(ch => ch.id)
    const joinedChannels = (await this.storedChannels.restore()) || {}
    await this.storedChannels.save({ ...joinedChannels, [character]: channelIDs })
  }

  async restoreJoinedChannels(character: string): Promise<string[]> {
    const restoredChannels = await this.storedChannels.restore()
    if (restoredChannels) {
      return restoredChannels[character] || []
    }
    return []
  }
}
