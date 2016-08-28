<template lang="pug">
mixin header
  app-header.color-main.ui-divide-bottom&attributes(attributes)

mixin left-column
  user-menu-content.ui-width-6.ui-divide-right.res.res-desktop(v-if!="state.socketState === 'identified'")&attributes(attributes)

mixin middle-column
  .flex-column&attributes(attributes)
    template(v-if="state.currentRoom")
      .flex-fixed.color-dark.ui-height-2.ui-padding-3.ui-scroll-y.ui-pre-wrap(v-if="state.currentRoom.description")
        span(v-html="state.currentRoom.description || ''")
      .flex-fixed.color-dark.ui-height-1.ui-padding-2.ui-pre-wrap(v-if="state.currentRoom.partner")
        user-status(:status="state.currentRoom.partner.status", :statusmsg="state.currentRoom.partner.statusmsg")
      message-list.flex-grow.ui-divide-bottom.ui-divide-top.ui-scroll-y(:messages="state.currentRoom ? state.currentRoom.messages : []")
      chatbox.flex-fixed.color-dark.ui-height-1.ui-padding-4(@submit="chatboxSubmit")

mixin right-column
  .color-dark.ui-width-6.ui-divide-left.ui-scroll-y.res.res-desktop(v-if!="state.currentRoom && state.currentRoom.characters")&attributes(attributes)
    character-list(:users="state.currentRoom.characters", :ops="state.currentRoom.ops")

div(@click='checkDataAttribute')
  .ui-fullscreen.flex-column.color-darker
    +header.flex-fixed
    .flex-grow.flex-row.ui-divide-bottom
      +left-column.flex-fixed
      +middle-column.flex-grow
      +right-column.flex-fixed
  overlays(style="z-index: 2")
  .ui-anchor-right.ui-anchor-bottom.ui-margin-right-1
    transition(v-for='note in state.notifications', name='fade', appear)
      notification.ui-margin-bottom-1(@click.native="removeNotification(note)")
        i.mdi.mdi-information.ui-faded
        |  {{ note.text }}
</template>

<script>
import CharacterList from './CharacterList.vue'
import Overlays from './Overlays.vue'
import AppHeader from './AppHeader.vue'
import MessageList from './MessageList.vue'
import Chatbox from './Chatbox.vue'
import UserStatus from './UserStatus.vue'
import UserMenuContent from './UserMenuContent.vue'
import Notification from './Notification.vue'

import * as store from '../store'
import * as session from '../session'

export default {
  components: {
    Overlays,
    CharacterList,
    AppHeader,
    UserMenuContent,
    MessageList,
    Chatbox,
    UserStatus,
    Notification
  },

  data () {
    return {
      state: store.state
    }
  },

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

  mounted () {
    store.addAudioNotification('test', 1000)
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
    },

    chatboxSubmit (message) {
      this.state.currentRoom.sendMessage(message)
    },

    setCurrentRoom: store.setCurrentRoom,

    closeRoom (room) {
      room.close()
    },

    removeNotification: store.removeNotification
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
