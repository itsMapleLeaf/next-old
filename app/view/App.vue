<template>
  <div>
    <div class='flex-column ui-fullscreen'>
      <app-bar class='flex-fixed'></app-bar>
      <chat class='flex-grow'></chat>
    </div>
    <transition-group name='fade' appear v-if='store.overlays.length > 0'>
      <component v-for='(overlay, index) in store.overlays' :is='overlay' :key='index'></component>
    </transition-group>
  </div>
</template>

<script>
import Chat from './Chat.vue'
import UserMenu from './UserMenu.vue'
import Login from './Login.vue'
import CharacterSelect from './CharacterSelect.vue'
import ChannelSelect from './ChannelSelect.vue'
import AppBar from './AppBar.vue'

import store from '../store'
import socket from '../socket'
import session from '../session'

export default {
  components: {Chat, UserMenu, Login, CharacterSelect, ChannelSelect, AppBar},

  data () {
    return {
      initialized: false,
      store,
      socket,
      shortcuts: [
        { icon: 'menu', action: () => this.store.pushOverlay('user-menu') },
        { icon: 'forum', action: () => this.store.pushOverlay('channel-select') },
        { icon: 'heart', action: () => {} }
      ]
    }
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

  watch: {
    'socket.state' (state) {
      if (state === 'identified') {
        this.store.pushOverlay('channel-select')
      }
    }
  }
}
</script>
