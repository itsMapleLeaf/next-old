<template>
  <div class='ui-overlay' @click.self='close'>
    <div class='ui-panel-left ui-width-6 flex-column ui-scroll-y'>
      <section class='flex-fixed ui-padding-5'>
        <menu-header></menu-header>
        <status-form></status-form>
      </section>

      <section class='flex-grow color-dark'>
        <div class='res res-mobile'>
          <menu-room v-for='room in rooms'
            :room='room' :active='room === currentRoom'
            @selected='setRoom(room)' @closed='leaveRoom(room)'>
          </menu-room>

          <div class='ui-padding-1 color-main'></div>
        </div>

        <menu-option v-for='opt in options'
          :text='opt.text'
          :icon='opt.icon'
          :action='opt.action'>
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

export default {
  components: {MenuHeader, StatusForm, MenuOption, MenuRoom},

  data () {
    return {
      options: [
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
            socket.disconnect()
            store.popOverlay()
            store.pushOverlay('login')
          }
        },
        {
          text: 'Switch Character',
          icon: 'account-switch',
          action: () => {
            socket.disconnect()
            store.popOverlay()
            store.pushOverlay('character-select')
          }
        }
      ]
    }
  },

  computed: {
    rooms () { return store.rooms },
    currentRoom () { return store.getCurrentRoom() }
  },

  methods: {
    close () {
      store.popOverlay()
    },

    setRoom (room) {
      store.setCurrentRoom(room)
    },

    leaveRoom (room) {
      socket.leaveChannel(room.id)
    }
  }
}
</script>
