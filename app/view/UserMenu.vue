<template lang="jade">
side-menu(left='')
  span(slot='content')
    menu-header(:character='identity')
      span(slot='header') {{ header }}
      span.ui-faded(slot='subtext') In the mood for some play?
    status-form
  span(slot='options')
    .res.res-mobile
      menu-room(v-for='room in rooms', :room='room', :active='room === currentRoom', @selected='setRoom(room)', @closed='leaveRoom(room)')
      .ui-padding-1.color-main
    menu-option(v-for='opt in options', :icon='opt.icon', :action='opt.action') {{ opt.text }}
</template>

<script>
import SideMenu from './SideMenu.vue'
import MenuHeader from './MenuHeader.vue'
import StatusForm from './MenuStatusForm.vue'
import MenuOption from './MenuOption.vue'
import MenuRoom from './MenuRoom.vue'
import {store, state} from '../store'

const options = [
  {
    text: 'Channels',
    icon: 'forum',
    action: () => store.pushOverlay('channel-select')
  },
  {
    text: 'Online Users',
    icon: 'heart',
    action: () => store.pushOverlay('character-browser')
  },
  {
    text: 'Settings',
    icon: 'settings',
    action: () => {}
  },
  {
    text: 'Log Out',
    icon: 'logout',
    action: () => {
      store.disconnect()
      store.popOverlay()
      store.pushOverlay('login')
    }
  },
  {
    text: 'Switch Character',
    icon: 'account-switch',
    action: () => {
      store.disconnect()
      store.popOverlay()
      store.pushOverlay('character-select')
    }
  }
]

export default {
  components: {SideMenu, MenuHeader, StatusForm, MenuOption, MenuRoom},

  data () {
    return {
      state,
      options
    }
  },

  computed: {
    rooms () { return this.state.rooms },
    currentRoom () { return this.state.currentRoom },
    identity () { return this.state.identity },
    header () { return `Hi, ${this.identity.split(' ')[0]}!` }
  },

  methods: {
    setRoom (room) {
      store.setCurrentRoom(room)
    },

    leaveRoom (room) {
      store.leaveChannel(room.id)
    }
  }
}
</script>
