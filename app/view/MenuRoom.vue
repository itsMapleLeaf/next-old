<template>
  <a href='#' class='flex flex-justify-space-between' :class="active ? 'highlight-blue' : ''"
    @click="$emit('selected')">
    <span class='ui-padding-4'>
      <room-title :room='room'></room-title>
    </span>
    <span class='ui-padding-4 ui-faded' @click.stop="$emit('closed')">
      <i class='mdi mdi-close'></i>
    </span>
  </a>
</template>

<script>
import RoomTitle from './RoomTitle.vue'

export default {
  components: {RoomTitle},
  props: {
    room: Object,
    active: Boolean
  }
}
</script>
