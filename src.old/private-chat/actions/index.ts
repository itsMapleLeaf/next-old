import { sendSocketCommand } from 'src/chat/actions/socketActions'
import { ChatMessage } from 'src/chat/models/ChatMessage'
import { chatStore, privateChatStore } from 'src/stores'

export function openPrivateChat(partner: string) {
  privateChatStore.openPrivateChat(partner)
  savePrivateChats().catch(console.error)
}

export function removePrivateChat(partner: string) {
  privateChatStore.closePrivateChat(partner)
  savePrivateChats().catch(console.error)
}

export function sendPrivateMessage(recipient: string, message: string) {
  sendSocketCommand('PRI', { recipient, message })

  const privateChat = privateChatStore.getPrivateChat(recipient)
  privateChat.messages.push(new ChatMessage('normal', message, chatStore.identity))
}

export async function savePrivateChats() {
  await privateChatStore.savePrivateChats(chatStore.identity)
}

export async function restorePrivateChats() {
  const partners = await privateChatStore.restorePrivateChats(chatStore.identity)
  partners.forEach(openPrivateChat)
}

export function handlePrivateChatSocketCommand(cmd: string, params: any) {
  if (cmd === 'PRI') {
    const privateChat = privateChatStore.openPrivateChat(params.character)
    privateChat.messages.push(new ChatMessage('normal', params.message, params.character))
  }
}
