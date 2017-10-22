import { observable } from 'mobx'
import { ChannelInfo } from 'src/channel-browser/models/ChannelBrowserItem'

// TODO: please think of a better name for this
type ChannelInfoData = {
  name: string
  title?: string
  characters: number
}

function resolveChannelInfoData(channelData: ChannelInfoData[]) {
  return channelData.map(ch => {
    return new ChannelInfo('public', ch.name, ch.title || ch.name, ch.characters)
  })
}

export class ChannelListStore {
  @observable publicChannels = [] as ChannelInfo[]
  @observable privateChannels = [] as ChannelInfo[]

  setPublicChannels(channels: ChannelInfo[]) {
    this.publicChannels = channels
  }

  setPrivateChannels(channels: ChannelInfo[]) {
    this.privateChannels = channels
  }

  handleSocketCommand(cmd: string, params: any) {
    if (cmd === 'CHA') {
      this.setPublicChannels(resolveChannelInfoData(params.channels))
    } else if (cmd === 'ORS') {
      this.setPrivateChannels(resolveChannelInfoData(params.channels))
    }
  }
}
