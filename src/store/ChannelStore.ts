import { Channel } from './models'
import Vue from 'vue'

export class ChannelStore {
  private channels = {} as Dictionary<Channel>

  removeChannel(id: string) {
    Vue.delete(this.channels, id)
  }

  getChannel(id: string) {
    return this.channels[id] || Vue.set(this.channels, id, new Channel(id))
  }

  getJoinedChannels() {
    return Object.keys(this.channels)
  }
}
