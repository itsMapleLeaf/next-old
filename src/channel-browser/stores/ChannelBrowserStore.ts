import { action, observable } from 'mobx'
import { ChannelBrowserEntry } from 'src/channel-browser/models/ChannelBrowserEntry'

type ChannelBrowserEntryData = {
  name: string
  title?: string
  characters: number
}

function resolveChannelInfoData(channelData: ChannelBrowserEntryData[]) {
  return channelData.map(ch => {
    return new ChannelBrowserEntry('public', ch.name, ch.title || ch.name, ch.characters)
  })
}

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

  @action
  handleSocketCommand(cmd: string, params: any) {
    if (cmd === 'CHA') {
      this.setPublicChannels(resolveChannelInfoData(params.channels))
    } else if (cmd === 'ORS') {
      this.setPrivateChannels(resolveChannelInfoData(params.channels))
    }
  }
}
