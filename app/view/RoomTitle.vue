<template lang='jade'>
component(:is='roomTitle', :room='room')
</template>

<script>
import ChannelRoomTitle from './ChannelRoomTitle.vue'
import PrivateRoomTitle from './PrivateRoomTitle.vue'

export default {
  components: {ChannelRoomTitle, PrivateRoomTitle},
  props: {
    room: Object
  },
  computed: {
    roomTitle () {
      return this.room.type + '-room-title'
    }
  }
}
</script>
