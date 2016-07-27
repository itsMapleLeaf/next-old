<template>
  <div class='color-dark flex-column'>
    <template v-if='chat != null'>
      <description class='flex-fixed color-main ui-height-2 ui-desktop'>
        {{chat.description}}
      </description>
      <div class='flex-grow flex flex-align-stretch ui-divide-top'>
        <messages
          class='flex-grow ui-scroll-y'
          :messages='chat.messages'>
        </messages>
        <users
          class='ui-desktop flex-fixed ui-width-5 color-main ui-scroll-y ui-divide-left'
          :users='chat.characters'>
        </users>
      </div>
      <chatbox class='flex-fixed color-main ui-height-2 ui-divide-top'></chatbox>
    </template>
  </div>
</template>

<script>
import Description from './RoomDescription.vue'
import Users from './UserList.vue'
import Messages from './MessageList.vue'
import Chatbox from './Chatbox.vue'
import store from '../store'

export default {
  components: {Description, Users, Messages, Chatbox},

  data () {
    return {
      store,
      currentRoomIndex: 0
    }
  },

  computed: {
    chat () {
      return this.store.rooms[this.currentRoomIndex]
    }
  }
}
</script>
