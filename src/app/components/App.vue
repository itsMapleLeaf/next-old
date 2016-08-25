<template lang="jade">
div(@click='checkDataAttribute')
  .flex-column.ui-fullscreen
    app-bar.flex-fixed
    chat.flex-grow
  transition(v-for='(overlay, index) in state.overlays', :key='index', name='overlay', appear)
    component(:is='overlay', style='z-index: 2')
  a.ui-anchor-right.ui-anchor-bottom.ui-padding-subtle.ui-faded(href='#', style='z-index: 3', v-if="!state.overlays.includes('about')", @click="pushOverlay('about')")
    i.mdi.mdi-information
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
import About from './About.vue'

import * as store from '../store'
import * as session from '../session'

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
    CharacterBrowser,
    About
  },

  data () {
    return {
      initialized: false,
      state: store.state
    }
  },

  mounted () {
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
