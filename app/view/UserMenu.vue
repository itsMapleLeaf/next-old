<template>
  <div class='ui-overlay' @click.self='close'>
    <div class='ui-panel-left ui-width-6 flex-column ui-scroll-y'>
      <section class='flex-fixed ui-padding-5'>
        <menu-header></menu-header>
        <status-form></status-form>
      </section>
      <section class='flex-grow color-dark'>
        <a v-for='room in rooms' href='#'
          :class="'ui-block ui-padding-4 ui-hover-darken ' + (room === currentRoom ? 'highlight-blue' : '')"
          @click.prevent='setRoom(room)'>
          <i class='mdi mdi-earth'></i> {{room.name}}
        </a>

        <div class='ui-padding-1 color-main'></div>

        <a v-for='option in options'
          href='#'
          class='ui-block ui-padding-4 ui-hover-darken'
          @click.prevent='option.action'>
          <i :class="'mdi mdi-' + option.icon"></i> {{option.text}}
        </a>
      </section>
    </div>
  </div>
</template>

<script>
import MenuHeader from './MenuHeader.vue'
import StatusForm from './MenuStatusForm.vue'
import store from '../store'
import socket from '../socket'

export default {
  components: {MenuHeader, StatusForm},

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
          action: () => {}
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
    }
  }
}
</script>
