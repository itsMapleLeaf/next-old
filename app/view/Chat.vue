<template lang='jade'>
.color-dark.flex-column
  component.flex-grow(v-if='room', :is='roomView', :room='room')
  textarea.flex-fixed.color-main.ui-block.ui-padding-2(v-if='room', style='height: 4rem', :placeholder="'Chatting as ' + store.identity + '...'")
</template>

<script>
import ChannelRoomView from './ChannelRoomView.vue'
import PrivateRoomView from './PrivateRoomView.vue'
import store from '../store'

export default {
  components: {ChannelRoomView, PrivateRoomView},

  data () {
    return {
      store
    }
  },

  computed: {
    room () {
      return this.store.getCurrentRoom()
    },

    roomView () {
      if (this.room.type === 'channel') {
        return 'channel-room-view'
      } else if (this.room.type === 'private') {
        return 'private-room-view'
      }
    }
  }
}
</script>
