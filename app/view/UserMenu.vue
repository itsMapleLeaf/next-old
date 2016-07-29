<template>
  <side-menu left>
    <span slot='content'>
      <menu-header :character='identity'>
        <span slot='header'>{{ header }}</span>
        <span slot='subtext' class='ui-faded'>
          In the mood for some play?
        </span>
      </menu-header>
      <status-form></status-form>
    </span>

    <span slot='options'>
      <div class='res res-mobile'>
        <menu-room v-for='room in rooms' :room='room' :active='room === currentRoom'
          @selected='setRoom(room)' @closed='leaveRoom(room)'>
        </menu-room>
        <div class='ui-padding-1 color-main'></div>
      </div>

      <menu-option v-for='opt in options' :icon='opt.icon' :action='opt.action'>
        {{ opt.text }}
      </menu-option>
    </span>
  </side-menu>
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
