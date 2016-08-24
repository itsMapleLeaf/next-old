<template lang="jade">
.color-dark.flex-column
  component.flex-grow(v-if='roomView', :is='roomView', :room='state.currentRoom')
</template>

<script>
import ChannelRoomView from './ChannelRoomView.vue'
import PrivateRoomView from './PrivateRoomView.vue'
import {state} from '../store'

export default {
  components: {ChannelRoomView, PrivateRoomView},

  data () {
    return {
      state
    }
  },

  computed: {
    roomView () {
      const {currentRoom} = this.state
      if (currentRoom) {
        switch (currentRoom.type) {
          case 'channel': return 'channel-room-view'
          case 'private': return 'private-room-view'
        }
      }
    }
  }
}
</script>
