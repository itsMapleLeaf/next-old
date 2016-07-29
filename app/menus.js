import store from './store'
import socket from './socket'

export const userMenu = [
  {
    text: 'Channels',
    icon: 'forum',
    action: () => store.pushOverlay('channel-select')
  },
  {
    text: 'Online Users',
    icon: 'heart',
    action: () => store.pushOverlay('character-browser')
  },
  {
    text: 'Settings',
    icon: 'settings',
    action: () => {}
  },
  {
    text: 'Log Out',
    icon: 'logout',
    action: () => {
      socket.disconnect()
      store.popOverlay()
      store.pushOverlay('login')
    }
  },
  {
    text: 'Switch Character',
    icon: 'account-switch',
    action: () => {
      socket.disconnect()
      store.popOverlay()
      store.pushOverlay('character-select')
    }
  }
]
