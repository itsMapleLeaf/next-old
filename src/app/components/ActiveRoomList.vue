<template lang="pug">
div
  a.ui-block.ui-padding-3(href='#', v-for="room of state.rooms",
    :class="room === state.currentRoom ? 'color-main' : ''", @click="setCurrentRoom(room)")
    room-title(:room="room")
</template>

<script>
import RoomTitle from './RoomTitle.vue'
import {state, setCurrentRoom} from '../store'

export default {
  components: {RoomTitle},
  data () {
    return {
      state
    }
  },
  methods: {
    setCurrentRoom
  }
}
</script>
