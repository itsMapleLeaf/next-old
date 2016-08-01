<template lang='jade'>
side-menu(left='')
  span(slot='content')
    menu-header(:character='identity')
      span(slot='header') {{ header }}
      span.ui-faded(slot='subtext')
        | In the mood for some play?
    status-form
  span(slot='options')
    .res.res-mobile
      menu-room(v-for='room in rooms', :room='room', :active='room === currentRoom', @selected='setRoom(room)', @closed='leaveRoom(room)')
      .ui-padding-1.color-main
    menu-option(v-for='opt in options', :icon='opt.icon', :action='opt.action')
      | {{ opt.text }}
</template>

<script>
import SideMenu from './SideMenu.vue'
import MenuHeader from './MenuHeader.vue'
import StatusForm from './MenuStatusForm.vue'
import MenuOption from './MenuOption.vue'
import MenuRoom from './MenuRoom.vue'
import store from '../store'
import socket from '../socket'
import {userMenu as options} from '../menus'

export default {
  components: {SideMenu, MenuHeader, StatusForm, MenuOption, MenuRoom},

  data () {
    return {
      store,
      options
    }
  },

  computed: {
    rooms () { return this.store.rooms },
    currentRoom () { return this.store.getCurrentRoom() },
    identity () { return this.store.identity },
    header () { return `Hi, ${this.identity.split(' ')[0]}!` }
  },

  methods: {
    setRoom (room) {
      this.store.setCurrentRoom(room)
    },

    leaveRoom (room) {
      socket.leaveChannel(room.id)
    }
  }
}
</script>
