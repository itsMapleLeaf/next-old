import { ChannelInfo } from './models'

export class ChannelListStore {
  private publicChannels = [] as ChannelInfo[]
  private privateChannels = [] as ChannelInfo[]

  getPublicChannels() {
    return this.publicChannels
  }

  setPublicChannels(channels: ChannelInfo[]) {
    this.publicChannels = channels
  }

  getPrivateChannels() {
    return this.privateChannels
  }

  setPrivateChannels(channels: ChannelInfo[]) {
    this.privateChannels = channels
  }
}
