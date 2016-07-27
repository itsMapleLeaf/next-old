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

        <a v-for='option in options' href='#' class='ui-block ui-padding-4 ui-hover-darken'>
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

export default {
  components: {MenuHeader, StatusForm},

  data () {
    return {
      options: [
        { text: 'Channels', icon: 'forum' },
        { text: 'Online Users', icon: 'heart' },
        { text: 'Settings', icon: 'settings' },
        { text: 'Log Out', icon: 'logout' },
        { text: 'Switch Character', icon: 'account-switch' }
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
