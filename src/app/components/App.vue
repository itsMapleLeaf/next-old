<template lang="pug">
div(@click='checkDataAttribute')
  .ui-fullscreen.flex-column.color-darker
    app-header.flex-fixed.color-main.ui-divide-bottom
    chat.flex-grow.ui-divide-bottom(
      v-if="state.currentRoom != null",
      :room="state.currentRoom",
      @chatbox-submit="chatboxSubmit")
  overlays(style="z-index: 2")
  .ui-anchor-right.ui-anchor-bottom.ui-margin-right-1
    transition(v-for='note in state.notifications', v-if='note.visible', name='fade', appear)
      notification.ui-margin-bottom-1(@click.native="activateNotification(note)")
        i.mdi.mdi-information-variant
        |  {{ note.text }}
</template>

<script>
import Chat from './Chat.vue'
import Overlays from './Overlays.vue'
import AppHeader from './AppHeader.vue'
import Notification from './Notification.vue'

import * as store from '../store'
import * as session from '../session'

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

  computed: {},

  created () {
    if (this.state.socketState !== 'offline') return
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
        const data = session.load()
        if (data) {
          resolve(data)
        } else {
          reject()
        }
      })
      .then(data => {
        return store.fetchUserData(data.account, data.ticket)
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
    },

    activateNotification (note) {
      note.activate()
      note.visible = false
    }
  },

  watch: {
    'state.socketState' (state) {
      if (state === 'identified') {
        const data = session.load()
        if (data) {
          for (let id of data[`channels:${this.state.identity}`] || []) {
            store.joinChannel(id)
          }
        }
      }
    },

    'state.channelRooms' (rooms) {
      const data = session.load()
      if (data) {
        data[`channels:${this.state.identity}`] = Object.keys(rooms)
        session.save()
      }
    },

    'state.identity' (name) {
      document.title = name ? `${name} | F-Chat Next` : 'F-Chat Next'
    }
  }
}
</script>
