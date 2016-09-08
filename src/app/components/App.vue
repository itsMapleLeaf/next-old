<template lang="pug">
div(@click='checkDataAttribute')
  .ui-fullscreen.flex-column.color-darker
    app-header.flex-fixed.color-main.ui-divide-bottom
    chat.flex-grow(v-if="state.currentRoom != null", :room="state.currentRoom",
      @chatbox-submit="chatboxSubmit")
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

import * as store from '../store'
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
    pushOverlay: store.pushOverlay,
    setCurrentRoom: store.setCurrentRoom,

    authenticate () {
      return new Promise((resolve, reject) => {
        const account = session.getStorageItem('account')
        const ticket = session.getStorageItem('ticket')
        account && ticket
          ? resolve(account, ticket)
          : reject('Storage data not found')
      })
      .then((account, ticket) => {
        return store.fetchUserData(account, ticket)
      })
    },

    checkDataAttribute (event) {
      for (let {name, value} of event.target.attributes) {
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
      this.state.currentRoom.sendMessage(message)
    },

    closeRoom (room) {
      room.close()
    }
  },

  computed: {
    windowTitle: {
      get () { return document.title },
      set (title) { document.title = title }
    }
  },

  watch: {
    'state.socketState' (state) {
      if (state === 'identified') {
        const channels = session.getStorageItem(`channels:${this.state.identity}`)
        for (let id of channels || []) {
          store.joinChannel(id)
        }
      }
    },

    'state.channelRooms' (rooms) {
      session.setStorageItem(`channels:${this.state.identity}`, Object.keys(rooms))
    },

    'state.currentRoom' (room) {
      room.active = false
    }
  }
}
</script>
