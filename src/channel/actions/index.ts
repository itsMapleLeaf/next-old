import { sendSocketCommand } from 'src/chat/actions/socketActions'
import { ChatMessage } from 'src/chat/models/ChatMessage'
import { channelStore, chatStore } from 'src/stores'

export function joinChannel(id: string) {
  sendSocketCommand('JCH', { channel: id })
}

export function leaveChannel(id: string) {
  sendSocketCommand('LCH', { channel: id })
}

export function sendChannelMessage(id: string, message: string) {
  sendSocketCommand('MSG', { channel: id, message })

  const channel = channelStore.getChannel(id)
  if (channel) {
    channel.messages.push(new ChatMessage('normal', message, chatStore.identity))
  }
}

export async function saveJoinedChannels() {
  await channelStore.saveJoinedChannels(chatStore.identity)
}

export async function restoreJoinedChannels() {
  const channels = await channelStore.restoreJoinedChannels(chatStore.identity)
  channels.forEach(joinChannel)
}

export function handleChannelSocketCommand(cmd: string, params: any) {
  if (cmd === 'FLN') {
    channelStore.getChannels().forEach(channel => {
      channel.removeUser(params.character)
    })
  }

  if (cmd === 'JCH') {
    const channel = channelStore.getChannel(params.channel)
    const name = params.character.identity
    channel.setTitle(params.title)
    channel.addUser(name)
  }

  if (cmd === 'LCH') {
    const channel = channelStore.getChannel(params.channel)
    channel.removeUser(params.character)
  }

  if (cmd === 'ICH') {
    const channel = channelStore.getChannel(params.channel)
    const userData = params.users as Array<{ identity: string }>
    channel.setUsers(userData.map(user => user.identity))
    channel.setMode(params.mode)
  }

  if (cmd === 'CDS') {
    const channel = channelStore.getChannel(params.channel)
    channel.setDescription(params.description)
  }

  if (cmd === 'COL') {
    const channel = channelStore.getChannel(params.channel)
    channel.setOps(params.oplist)
  }

  if (cmd === 'MSG') {
    const channel = channelStore.getChannel(params.channel)
    channel.addMessage(new ChatMessage('normal', params.message, params.character))
  }

  if (cmd === 'LRP') {
    const channel = channelStore.getChannel(params.channel)
    channel.addMessage(new ChatMessage('lfrp', params.message, params.character))
  }
}
