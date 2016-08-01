<template lang='jade'>
a.flex.flex-justify-space-between(href='#', :class="active ? 'highlight-blue' : ''", @click="$emit('selected')")
  span.ui-padding-4
    room-title(:room='room')
  span.ui-padding-4.ui-faded(@click.stop="$emit('closed')")
    i.mdi.mdi-close
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
