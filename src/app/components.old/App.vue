<template lang="pug">
div(@click='checkDataAttribute')
  chat.ui-fullscreen(:room="state.currentChat", @chatbox-submit="chatboxSubmit")
  overlays(style="z-index: 2")
  .ui-anchor-right.ui-anchor-bottom.ui-margin-right-1
    notification.ui-margin-bottom-1(v-for="note in state.messageBubbles",
      :text="note.text", @click.native="note.onclick()")
</template>

<script>
import Chat from './Chat.vue'
import Overlays from './Overlays.vue'
import AppHeader from './AppHeader.vue'
import Notification from './Notification.vue'

import * as store from '../store.new'
import * as session from '../session'
import {isConnected} from '../socket'

export default {
  components: {
    Chat,
    Overlays,
    AppHeader,
    Notification
  },
  data () {
    return {
      state: store.state
    }
  },
  created () {
    if (isConnected()) {
      store.setSocketState('identified')
      return
    }

    this.authenticate()
    .then(() => {
      store.pushOverlay('character-select')
    })
    .catch(err => {
      console.warn(err)
      store.pushOverlay('login')
    })
  },
  methods: {
    authenticate () {
      return new Promise((resolve, reject) => {
        const account = session.getStorageItem('account')
        const ticket = session.getStorageItem('ticket')
        if (account && ticket) {
          resolve(account, ticket)
        } else {
          reject('Storage data not found')
        }
      })
      .then((account, ticket) => {
        return store.fetchUserData(account, ticket)
      })
    },
    checkDataAttribute (event) {
      for (const {name, value} of event.target.attributes) {
        switch (name) {
          case 'data-character':
            store.openCharacterMenu(value)
            return

          case 'data-join-channel':
            store.joinChannel(value)
            return
        }
      }
    },
    chatboxSubmit (message) {
      this.state.activeChat.sendMessage(message)
    }
  },
  computed: {
    windowTitle () {
      const {identity, unreadMessageCount} = this.state
      let title = 'F-Chat Next'
      if (identity) title = `${identity} | ${title}`
      if (unreadMessageCount > 0) title = `(${unreadMessageCount}) ${title}`
      return title
    }
  },
  watch: {
    'state.socketState' (state) {
      if (state === 'identified') {
        const channels = session.getStorageItem(`channels:${this.state.identity}`)
        for (const id of channels || []) {
          store.joinChannel(id)
        }
      }
    },
    'state.activeChannels' (rooms) {
      session.setStorageItem(`channels:${this.state.identity}`, Object.keys(rooms))
    },
    'state.currentChat' (room) {
      room.active = false
    },
    'windowTitle' (title) {
      document.title = title
    }
  }
}
</script>
