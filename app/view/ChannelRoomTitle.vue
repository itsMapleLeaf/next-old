<template lang='jade'>
span
  i(:class="'mdi mdi-' + icon")
  span(v-html='room.name')
</template>

<script>
import ChannelRoom from '../models/ChannelRoom'

export default {
  props: {
    room: ChannelRoom
  },

  computed: {
    icon () {
      return this.room.name === this.room.id ? 'earth' : 'key-variant'
    }
  }
}
</script>
