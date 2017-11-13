import { action, observable } from 'mobx'
import { ChannelBrowserEntry } from 'src/channel-browser/models/ChannelBrowserEntry'

export class ChannelBrowserStore {
  @observable publicChannels = [] as ChannelBrowserEntry[]
  @observable privateChannels = [] as ChannelBrowserEntry[]

  @action
  setPublicChannels(channels: ChannelBrowserEntry[]) {
    this.publicChannels = channels
  }

  @action
  setPrivateChannels(channels: ChannelBrowserEntry[]) {
    this.privateChannels = channels
  }
}
