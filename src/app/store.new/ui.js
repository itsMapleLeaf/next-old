import state from './state'
import {remove} from './util'
import {Howl} from 'howler'

const notificationSound = new Howl({
  src: ['assets/notify.mp3', 'assets/notify.ogg'],
  volume: 0.5
})

// overlay management
export function pushOverlay (overlay) {
  state.overlays.push(overlay)
}

export function popOverlay () {
  state.overlays.pop()
}

// notifications / messages
export function showMessageBubble (text, lifetime = 3500, callback) {
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

export function logMessage (text) {
  state.messageLog.push({ text })
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

export function showNotification (text, lifetime, callback) {
  showSilentNotification(text, lifetime, callback)
  playNotificationSound()
}

export function showSilentNotification (text, lifetime, callback) {
  showMessageBubble(text, lifetime, callback)
  logMessage(text)
  incrementUnreadMessageCount()
}

// character menu stuff
export function setCharacterMenuFocus (name) {
  state.characterMenuFocus = state.onlineCharacters[name]
}

export function openCharacterMenu (name) {
  setCharacterMenuFocus(name)
  pushOverlay('character-menu')
}
