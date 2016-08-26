<template lang="pug">
div(@click='checkDataAttribute')
  .ui-fullscreen.flex-column.color-darker
    app-header.flex-fixed.color-main.ui-divide-bottom
    .flex-grow.flex-row
      .flex-fixed.ui-width-6.color-dark
        active-room-list.flex-grow
        // user info / config
      .flex-grow.flex-column.ui-divide-left.ui-divide-right
        .flex-fixed.color-dark.ui-height-2.ui-padding-3.ui-scroll-y.ui-pre-wrap(v-html="state.currentRoom ? state.currentRoom.description : ''")
        message-list.flex-grow.ui-divide-bottom.ui-divide-top(:messages="state.currentRoom ? state.currentRoom.messages : []")
        chatbox.flex-fixed.color-dark.ui-padding-4

      .flex-fixed.ui-width-6.color-dark.ui-scroll-y
        // user count
        user-list(v-if="state.currentRoom", :users="state.currentRoom.characters", :ops="state.currentRoom.ops")
  overlays(style="z-index: 2")
  a.ui-anchor-right.ui-anchor-bottom.ui-padding-subtle.ui-faded(href='#', style='z-index: 3', v-if="!state.overlays.includes('about')", @click="pushOverlay('about')")
    i.mdi.mdi-information
</template>

<script>
import Chat from './Chat.new.vue'
import UserList from './UserList.vue'
import Overlays from './Overlays.vue'
import AppHeader from './AppHeader.vue'
import ActiveRoomList from './ActiveRoomList.vue'
import MessageList from './MessageList.vue'
import Chatbox from './Chatbox.vue'

import * as store from '../store'
import * as session from '../session'

export default {
  components: {
    Chat,
    Overlays,
    UserList,
    AppHeader,
    ActiveRoomList,
    MessageList,
    Chatbox
  },

  data () {
    return {
      initialized: false,
      state: store.state
    }
  },

  created () {
    this.$nextTick(() => {
      if (this.initialized) return
      this.initialized = true

      this.authenticate()
      .then(() => {
        store.pushOverlay('character-select')
      })
      .catch(err => {
        console.warn(err)
        store.pushOverlay('login')
      })
    })
  },

  methods: {
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

    pushOverlay (overlay) {
      store.pushOverlay(overlay)
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
