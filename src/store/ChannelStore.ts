import Vue from 'vue'
import * as forage from 'localforage'
import { Channel } from './models'

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
    return Object.keys(this.joinedChannels)
  }

  async saveJoinedChannels() {
    await forage.setItem(storageKeyChannels, this.getJoinedChannels())
  }

  async restoreJoinedChannels() {
    const restoredChannels = await forage.getItem<string[]>(storageKeyChannels)
    return restoredChannels || []
  }
}
