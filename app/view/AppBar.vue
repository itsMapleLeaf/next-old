<template>
  <div class='color-darker flex'>
    <a href='#'
      v-for="shortcut in shortcuts"
      class='flex-fixed ui-inline-block ui-padding-subtle ui-fluid-border'
      @click="shortcut.action">
      <i :class="'mdi mdi-' + shortcut.icon"></i>
    </a>
    <div class='flex-grow flex flex-wrap res res-desktop'>
      <room-tab v-for='room in rooms' :key="room.name" :active='room === currentRoom'
        @click.native='setRoom(room)' @closed='leaveRoom(room)'>
        <room-title :room='room'></room-title>
      </room-tab>
    </div>
    <a href='#'
      v-if='currentRoom'
      class='
        flex-grow flex flex-align-center flex-justify-end
        res res-mobile'
      @click="pushOverlay('room-info')">
      <span class='ui-faded'><room-title :room='currentRoom'></room-title></span>
      <span class='ui-padding-subtle'><i class='mdi mdi-dots-vertical'></i></span>
    </a>
  </div>
</template>

<script>
import RoomTitle from './RoomTitle.vue'
import RoomTab from './RoomTab.vue'
import store from '../store'
import socket from '../socket'

export default {
  components: {RoomTab, RoomTitle},

  data () {
    return {
      shortcuts: [
        { icon: 'menu', action: () => this.pushOverlay('user-menu') },
        { icon: 'forum', action: () => this.pushOverlay('channel-select') },
        { icon: 'heart', action: () => this.pushOverlay('character-browser') }
      ]
    }
  },

  computed: {
    rooms () { return store.rooms },
    currentRoom () { return store.getCurrentRoom() }
  },

  methods: {
    pushOverlay (overlay) { store.pushOverlay(overlay) },
    setRoom (room) { store.setCurrentRoom(room) },
    leaveRoom (room) { socket.leaveChannel(room.id) }
  }
}
</script>
