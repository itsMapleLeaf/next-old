<template lang="pug">
mixin left
  .color-darker.ui-width-6.flex-fixed.flex-column.flex-justify-space-between.res.res-desktop
    .flex-grow
      a.ui-block.ui-padding-3(href='#', v-for="room of state.rooms", :class="room === state.currentRoom ? 'color-main' : ''", @click="setCurrentRoom(room)")
        room-title(:room="room")
    .ui-padding-4.flex-fixed.flex-row.flex-align-center.flex-justify-space-between
      avatar(:name="state.identity", width='50px', height='50px')
      a.ui-padding-subtle(href='#')
        i.mdi.mdi-settings

mixin middle
  .color-dark.flex-grow.flex-column
    .color-main.ui-height-2.ui-padding-3.ui-scroll-y.flex-fixed.flex-row.flex-justify-space-between(v-if="state.currentRoom")
      span.ui-pre-wrap(v-html="currentRoom.description || ''")
    message-list.color-dark.flex-grow.ui-scroll-y(:messages="currentRoom.messages || []")
    .ui-padding-3.flex-fixed.flex-row.flex-align-stretch
      chatbox.color-darker.flex-grow.ui-height-1.ui-padding-4.ui-block.ui-border

mixin right
  user-list.color-darker.ui-width-6.ui-scroll-y.flex-fixed.res.res-desktop(
    :users="currentRoom.characters || []",
    :ops="currentRoom.ops || []")

.flex-row
  +left
  +middle
  +right
</template>

<script>
import Chatbox from './Chatbox.vue'
import RoomTitle from './RoomTitle.vue'
import MessageList from './MessageList.vue'
import UserList from './UserList.vue'
import Avatar from './CharacterAvatarLink.vue'
import {state, setCurrentRoom} from '../store'

export default {
  components: {Chatbox, RoomTitle, MessageList, UserList, Avatar},

  data () {
    return {
      state
    }
  },

  computed: {
    currentRoom () {
      return this.state.currentRoom || {}
    }
  },

  methods: {
    setCurrentRoom
  }
}
</script>
