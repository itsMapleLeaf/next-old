// @flow
import {state} from './state'
import type {Name} from '../lib/types'
import {remove} from '../lib/util'
import {Howl} from 'howler'

const notificationSound = new Howl({
  src: [
    'assets/notify.mp3',
    'assets/notify.ogg'
  ],
  volume: 0.5
})

// overlay management
export function pushOverlay (overlay: string) {
  state.overlays.push(overlay)
}

export function popOverlay () {
  state.overlays.pop()
}

// notifications / messages
export function showMessageBubble (text: string, lifetime: number = 3500, callback?: Function) {
  const bubble = {
    text,
    onclick () {
      if (callback) callback()
      state.messageBubbles = remove(state.messageBubbles, bubble)
    }
  }
  if (lifetime != null) {
    window.setTimeout(() => {
      state.messageBubbles = remove(state.messageBubbles, bubble)
    }, lifetime)
  }
  state.messageBubbles.push(bubble)
}

export function logMessage (text: string) {
  state.messageLog.push(text)
}

export function incrementUnreadMessageCount () {
  state.unreadMessageCount++
}

export function resetUnreadMessageCount () {
  state.unreadMessageCount = 0
}

export function playNotificationSound () {
  notificationSound.stop().play()
}

export function showNotification (text: string, lifetime?: number, callback?: Function) {
  showSilentNotification(text, lifetime, callback)
  playNotificationSound()
}

export function showSilentNotification (text: string, lifetime?: number, callback?: Function) {
  showMessageBubble(text, lifetime, callback)
  logMessage(text)
  incrementUnreadMessageCount()
}

// character menu stuff
export function setCharacterMenuFocus (name: Name) {
  state.characterMenuFocus = state.onlineCharacters[name]
}

export function openCharacterMenu (name: Name) {
  setCharacterMenuFocus(name)
  pushOverlay('character-menu')
}
