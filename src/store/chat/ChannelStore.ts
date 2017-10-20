import Vue from 'vue'
import * as forage from 'localforage'
import { Channel, Message } from './models'

const storageKeyChannels = 'ChannelStore_joinedChannels'

export class ChannelStore {
  private channels = {} as Dictionary<Channel>
  private joinedChannels = {} as Dictionary<true>

  getChannel(id: string) {
    return this.channels[id] || Vue.set(this.channels, id, new Channel(id))
  }

  addJoinedChannel(id: string) {
    Vue.set(this.joinedChannels, id, true)
    this.saveJoinedChannels()
  }

  removeJoinedChannel(id: string) {
    Vue.delete(this.joinedChannels, id)
    this.saveJoinedChannels()
  }

  getJoinedChannels() {
    return Object.keys(this.joinedChannels).map(id => this.getChannel(id))
  }

  async saveJoinedChannels() {
    await forage.setItem(storageKeyChannels, this.getJoinedChannels())
  }

  async restoreJoinedChannels() {
    const restoredChannels = await forage.getItem<string[]>(storageKeyChannels)
    return restoredChannels || []
  }

  handleSocketCommand(cmd: string, params: any) {
    if (cmd === 'FLN') {
      Object.values(this.channels).forEach(channel => {
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
      channel.users = params.users.map(
        (user: { identity: string }) => user.identity,
      )
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
      channel.messages.push(
        new Message(params.character, params.message, 'normal'),
      )
    }

    if (cmd === 'LRP') {
      const channel = this.getChannel(params.channel)
      channel.messages.push(
        new Message(params.character, params.message, 'lfrp'),
      )
    }
  }
}
