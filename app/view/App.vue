<template lang="jade">
div(@click='checkDataAttribute')
  .flex-column.ui-fullscreen
    app-bar.flex-fixed
    chat.flex-grow
  transition(v-for='(overlay, index) in state.overlays', :key='index', name='overlay')
    component(:is='overlay', style='z-index: 9999')
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

import {store, state} from '../store'
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
      state
    }
  },

  mounted () {
    this.$nextTick(() => {
      if (this.initialized) return
      this.initialized = true

      const data = session.load()
      if (data) {
        store.fetchUserData(data.account, data.ticket)
        .then(() => {
          store.pushOverlay('character-select')
        })
        .catch(err => {
          console.warn(err)
          store.pushOverlay('login')
        })
      } else {
        store.pushOverlay('login')
      }
    })
  },

  methods: {
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
