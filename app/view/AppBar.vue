<template>
  <div class='color-darker flex'>
    <a href='#' v-for="shortcut in shortcuts"
      class='flex-fixed ui-inline-block ui-padding-subtle ui-fluid-border' @click="shortcut.action">
      <i :class="'mdi mdi-' + shortcut.icon"></i>
    </a>
    <div class='flex-grow flex'>
      <room-tab v-for='room in rooms' :active='room === currentRoom' @click.native='setRoom(room)'>
        <i class='mdi mdi-earth'></i> {{room.name}}
      </room-tab>
    </div>
  </div>
</template>

<script>
import RoomTab from './RoomTab.vue'
import store from '../store'

export default {
  components: {RoomTab},

  data () {
    return {
      shortcuts: [
        { icon: 'menu', action: () => store.pushOverlay('user-menu') },
        { icon: 'forum', action: () => store.pushOverlay('channel-select') },
        { icon: 'heart', action: () => {} }
      ]
    }
  },

  computed: {
    rooms () { return store.rooms },
    currentRoom () { return store.getCurrentRoom() }
  },

  methods: {
    setRoom (room) { store.setCurrentRoom(room) }
  }
}
</script>
