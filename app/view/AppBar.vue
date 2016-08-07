<template lang="jade">
.color-darker.flex
  a.flex-fixed.ui-inline-block.ui-padding-subtle.ui-fluid-border(href='#', v-for='shortcut in shortcuts', @click='shortcut.action')
    i(:class="'mdi mdi-' + shortcut.icon")
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
import {store, state} from '../store'

export default {
  components: {RoomTab, RoomTitle},

  data () {
    return {
      state,
      shortcuts: [
        { icon: 'menu', action: () => this.pushOverlay('user-menu') },
        { icon: 'forum', action: () => this.pushOverlay('channel-select') },
        { icon: 'heart', action: () => this.pushOverlay('character-browser') }
      ]
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
