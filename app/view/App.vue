<template>
  <div>
    <div class='flex-column ui-fullscreen'>
      <div class='flex-fixed color-darker'>
        <a href='#' v-for="shortcut in shortcuts" class='ui-inline-block ui-padding-subtle' @click="shortcut.action">
          <i :class="'mdi mdi-' + shortcut.icon"></i>
        </a>
      </div>
      <chat class='flex-grow'></chat>
    </div>
    <component :is='store.overlays[store.overlays.length - 1]'></component>
  </div>
</template>

<script>
import Chat from './Chat.vue'
import UserMenu from './UserMenu.vue'
import Login from './Login.vue'
import CharacterSelect from './CharacterSelect.vue'
import ChannelSelect from './ChannelSelect.vue'

import store from '../store'
import session from '../session'
import socket from '../socket'

export default {
  components: {Chat, UserMenu, Login, CharacterSelect, ChannelSelect},

  data () {
    return {
      initialized: false,
      store,
      socket,
      shortcuts: [
        { icon: 'menu', action () {} },
        { icon: 'forum', action: () => this.store.pushOverlay('channel-select') },
        { icon: 'heart', action () {} }
        // { icon: 'menu' },
        // { icon: 'menu' }
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
