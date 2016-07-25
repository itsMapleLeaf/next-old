<template>
  <div>
    <div class='flex-grow flex ui-fullscreen'>
      <user-menu class='flex-fixed ui-width-5 ui-desktop'></user-menu>
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

import store from '../store'
import session from '../session'

export default {
  components: {Chat, UserMenu, Login, CharacterSelect},

  data () {
    return {store}
  },

  mounted () {
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
  }
}
</script>
