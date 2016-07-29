<template>
  <div class='ui-overlay' @click.self='close'>
    <div class='ui-panel-left ui-width-6 flex-column ui-scroll-y'>
      <section class='flex-fixed ui-padding-5'>
        <menu-header :character='identity'>
          <span slot='header'>{{ header }}</span>
          <span slot='subtext' class='ui-faded'>In the mood for some play?</span>
        </menu-header>
        <status-form></status-form>
      </section>

      <section class='flex-grow color-dark'>
        <div class='res res-mobile'>
          <menu-room v-for='room in rooms' :room='room' :active='room === currentRoom'
            @selected='setRoom(room)' @closed='leaveRoom(room)'>
          </menu-room>

          <div class='ui-padding-1 color-main'></div>
        </div>

        <menu-option v-for='opt in options' :text='opt.text' :icon='opt.icon' :action='opt.action'>
        </menu-option>
      </section>
    </div>
  </div>
</template>

<script>
import MenuHeader from './MenuHeader.vue'
import StatusForm from './MenuStatusForm.vue'
import MenuOption from './MenuOption.vue'
import MenuRoom from './MenuRoom.vue'
import store from '../store'
import socket from '../socket'
import {userMenu as options} from '../menus'

export default {
  components: {MenuHeader, StatusForm, MenuOption, MenuRoom},

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
    close () {
      this.store.popOverlay()
    },

    setRoom (room) {
      this.store.setCurrentRoom(room)
    },

    leaveRoom (room) {
      socket.leaveChannel(room.id)
    }
  }
}
</script>
