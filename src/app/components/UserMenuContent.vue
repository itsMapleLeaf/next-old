<template lang="pug">
mixin option(text, icon, action)
  menu-option(icon!=icon, @input!=action)!= text

.flex-column
  .flex-fixed.ui-padding-5
    menu-header(:character='identity')
      span(slot='header') {{ header }}
      span.ui-faded(slot='subtext') In the mood for some play?
    status-form
  .flex-grow.color-dark
    menu-room(v-for='room in rooms', :room='room', :active='room === currentRoom', @selected='setRoom(room)', @closed='leaveRoom(room)')
    .ui-padding-1.color-main
    +option('Channels', 'forum', "pushOverlay('channel-select')")
    +option('Online Users', 'heart', "pushOverlay('character-browser')")
    +option('Settings', 'settings')
    +option('Log Out', 'logout', "logOut")
    +option('Switch Character', 'account-switch', "switchCharacter")
</template>

<script>
import MenuHeader from './MenuHeader.vue'
import StatusForm from './MenuStatusForm.vue'
import MenuOption from './MenuOption.vue'
import MenuRoom from './MenuRoom.vue'
import * as store from '../store'

export default {
  components: {MenuHeader, StatusForm, MenuOption, MenuRoom},

  data () {
    return {
      state: store.state
    }
  },

  computed: {
    rooms () { return this.state.rooms },
    currentRoom () { return this.state.currentRoom },
    identity () { return this.state.identity },
    header () { return `Hi, ${this.identity.split(' ')[0]}!` }
  },

  methods: {
    pushOverlay (overlay) {
      store.pushOverlay(overlay)
    },

    setRoom (room) {
      store.setCurrentRoom(room)
    },

    leaveRoom (room) {
      store.leaveChannel(room.id)
    },

    logOut () {
      store.disconnectFromChatServer()
      store.popOverlay()
      store.pushOverlay('login')
    },

    switchCharacter () {
      store.disconnectFromChatServer()
      store.popOverlay()
      store.pushOverlay('character-select')
    }
  }
}
</script>
