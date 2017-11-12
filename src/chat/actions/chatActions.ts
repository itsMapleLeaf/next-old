import { sendSocketCommand } from './socketActions'

export function updateStatus(status: string, statusmsg: string) {
  sendSocketCommand('STA', { status, statusmsg })
}

export function ignore(name: string) {
  sendSocketCommand('IGN', { action: 'add', character: name })
}

export function unignore(name: string) {
  sendSocketCommand('IGN', { action: 'delete', character: name })
}
