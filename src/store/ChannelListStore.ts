import { ChannelInfo } from './models'

type ChannelInfoData = {
  name: string
  title?: string
  characters: number
}

function resolveChannelInfoData(channelData: ChannelInfoData[]) {
  return channelData.map(ch => {
    return new ChannelInfo(
      'public',
      ch.name,
      ch.title || ch.name,
      ch.characters,
    )
  })
}

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

  handleSocketCommand(cmd: string, params: any) {
    switch (cmd) {
      case 'CHA': {
        this.setPublicChannels(resolveChannelInfoData(params.channels))
        break
      }
      case 'ORS': {
        this.setPrivateChannels(resolveChannelInfoData(params.channels))
        break
      }
    }
  }
}
