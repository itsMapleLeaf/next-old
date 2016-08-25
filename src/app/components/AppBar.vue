<template lang="pug">
mixin shortcut(icon, action)
  a.flex-fixed.ui-inline-block.ui-padding-subtle(href='#', @click!=action)
    i(class='mdi mdi-' + icon)

.color-darker.flex
  +shortcut('menu', "pushOverlay('user-menu')")
  +shortcut('forum', "pushOverlay('channel-select')")
  +shortcut('heart', "pushOverlay('character-browser')")
  .flex-grow.flex.flex-wrap.res.res-desktop
    room-tab(v-for='room in rooms', :key='room.name', :active='room === currentRoom', @click.native='setRoom(room)', @closed='leaveRoom(room)')
      room-title(:room='room')
  a.flex-grow.flex.flex-align-center.flex-justify-end.res.res-mobile(href='#', v-if='currentRoom', @click="pushOverlay('room-info')")
    span.ui-faded
      room-title(:room='currentRoom')
    span.ui-padding-subtle
      i.mdi.mdi-dots-vertical
</template>

<script>
import RoomTitle from './RoomTitle.vue'
import RoomTab from './RoomTab.vue'
import * as store from '../store'

export default {
  components: {RoomTab, RoomTitle},

  data () {
    return {
      state: store.state
    }
  },

  computed: {
    rooms () { return this.state.rooms },
    currentRoom () { return this.state.currentRoom }
  },

  methods: {
    pushOverlay (overlay) { store.pushOverlay(overlay) },

    setRoom (room) { store.setCurrentRoom(room) },

    leaveRoom (room) {
      switch (room.type) {
        case 'channel':
          store.leaveChannel(room.id)
          break

        case 'private':
          store.removePrivateRoom(room.partner.name)
          break
      }
    }
  }
}
</script>
