<template lang="pug">
div
  a.flex-row.flex-justify-space-between.ui-transition(href='#', v-for="room of rooms", :class="roomClass(room)", @click="$emit('selected', room)")
    span.ui-padding-3
      room-title(:room='room')
    span.ui-padding-3.ui-faded(@click.stop="$emit('closed', room)")
      i.mdi.mdi-close
</template>

<script>
import RoomTitle from './RoomTitle.vue'

export default {
  components: {RoomTitle},
  props: {
    rooms: Array,
    current: Object
  },
  methods: {
    roomClass (room) {
      return room === this.current ? 'highlight-blue'
        : room.active ? 'color-main'
        : 'color-darker'
    }
  }
}
</script>
