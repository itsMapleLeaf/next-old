<template>
  <div @click='clicked'>
    <div class='flex-column ui-fullscreen'>
      <app-bar class='flex-fixed'></app-bar>
      <chat class='flex-grow'></chat>
    </div>
    <transition v-for='overlay in store.overlays' name='overlay'>
      <component :is='overlay'></component>
    </transition>
  </div>
</template>

<script>
import Chat from './Chat.vue'
import UserMenu from './UserMenu.vue'
import CharacterMenu from './CharacterMenu.vue'
import Login from './Login.vue'
import CharacterSelect from './CharacterSelect.vue'
import ChannelSelect from './ChannelSelect.vue'
import RoomInfo from './RoomInfo.vue'
import CharacterBrowser from './CharacterBrowser.vue'
import AppBar from './AppBar.vue'

import store from '../store'
import socket from '../socket'
import session from '../session'

export default {
  components: {
    Chat,
    UserMenu,
    CharacterMenu,
    Login,
    CharacterSelect,
    ChannelSelect,
    AppBar,
    RoomInfo,
    CharacterBrowser
  },

  data () {
    return {
      initialized: false,
      store, socket
    }
  },

  computed: {
    identity () { return store.identity }
  },

  mounted () {
    this.$nextTick(() => {
      if (this.initialized) return
      this.initialized = true

      const data = session.load()
      if (data) {
        this.store.fetchUserData(data.account, data.ticket).then(() => {
          this.store.pushOverlay('character-select')
        })
        .catch(err => {
          console.warn(err)
          this.store.pushOverlay('login')
        })
      } else {
        this.store.pushOverlay('login')
      }
    })
  },

  methods: {
    clicked (event) {
      for (let {name, value} of event.target.attributes) {
        switch (name) {
          case 'data-character':
            this.store.openCharacterMenu(value)
            return false
        }
      }
    }
  },

  watch: {
    'socket.state' (state) {
      if (state === 'identified') {
        const data = session.load()
        if (data) {
          for (let id of data[`channels:${this.store.identity}`] || []) {
            socket.joinChannel(id)
          }
        }
      }
    },

    'store.channelRooms' (rooms) {
      const data = session.load()
      if (data) {
        data[`channels:${this.identity}`] = Object.keys(rooms)
        session.save()
      }
    }
  }
}
</script>
