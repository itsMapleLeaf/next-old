<template lang="pug">
div
  menu-room.ui-transition(v-for='room in rooms', :room='room', :active='room === current',
    @selected="$emit('input', room)", @closed="$emit('closed', room)")
</template>

<script>
import MenuRoom from './MenuRoom.vue'

export default {
  components: {MenuRoom},
  props: {
    rooms: Array,
    current: Object
  }
}
</script>
