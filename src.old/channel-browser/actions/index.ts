import { ChannelBrowserEntry } from 'src/channel-browser/models/ChannelBrowserEntry'
import { sendSocketCommand } from 'src/chat/actions/socketActions'
import { channelBrowserStore } from 'src/stores'

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

export function handleChannelBrowserSocketCommand(cmd: string, params: any) {
  if (cmd === 'CHA') {
    channelBrowserStore.setPublicChannels(resolveChannelInfoData(params.channels))
  } else if (cmd === 'ORS') {
    channelBrowserStore.setPrivateChannels(resolveChannelInfoData(params.channels))
  }
}

export function fetchChannelList() {
  sendSocketCommand('CHA')
  sendSocketCommand('ORS')
}
