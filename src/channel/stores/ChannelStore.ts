import { observable } from 'mobx'

import { Channel } from 'src/channel/models/Channel'
import { StoredValue } from 'src/common/util/stored-value'
import { Message } from 'src/message/models/Message'

export type ChannelID = string

export class ChannelStore {
  @observable private channels = new Map<ChannelID, Channel>()
  @observable private joinedChannels = new Map<ChannelID, true>()
  private storedChannels = new StoredValue<string[]>('ChannelStore_joinedChannels')

  getChannel(id: ChannelID) {
    let channel = this.channels.get(id)
    if (!channel) {
      channel = new Channel(id)
      this.channels.set(id, channel)
    }
    return channel
  }

  addJoinedChannel(id: ChannelID) {
    this.joinedChannels.set(id, true)
    this.saveJoinedChannels().catch(console.error)
  }

  removeJoinedChannel(id: ChannelID) {
    this.joinedChannels.delete(id)
    this.saveJoinedChannels().catch(console.error)
  }

  getJoinedChannels() {
    return Array.from(this.joinedChannels.keys()).map(id => this.getChannel(id))
  }

  async saveJoinedChannels() {
    const channelIDs = this.getJoinedChannels().map(ch => ch.id)
    await this.storedChannels.save(channelIDs)
  }

  async restoreJoinedChannels() {
    const restoredChannels = await this.storedChannels.restore()
    return restoredChannels || []
  }

  handleSocketCommand(cmd: string, params: any) {
    if (cmd === 'FLN') {
      this.channels.forEach(channel => {
        channel.users = channel.users.filter(name => name !== params.character)
      })
    }

    if (cmd === 'JCH') {
      const channel = this.getChannel(params.channel)
      const name = params.character.identity
      channel.title = params.title
      channel.users.push(name)
    }

    if (cmd === 'LCH') {
      const channel = this.getChannel(params.channel)
      channel.users = channel.users.filter(name => name !== params.character)
    }

    if (cmd === 'ICH') {
      const channel = this.getChannel(params.channel)
      channel.mode = params.mode
      channel.users = params.users.map((user: { identity: string }) => user.identity)
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
      channel.messages.push(new Message(params.character, params.message, 'normal'))
    }

    if (cmd === 'LRP') {
      const channel = this.getChannel(params.channel)
      channel.messages.push(new Message(params.character, params.message, 'lfrp'))
    }
  }
}
