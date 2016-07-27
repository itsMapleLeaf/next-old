<template>
  <div class='color-dark flex-column'>
    <template v-if='currentRoom != null'>
      <description class='flex-fixed color-main ui-height-2 res res-desktop'>
        {{currentRoom.description}}
      </description>
      <div class='flex-grow flex flex-align-stretch ui-divide-top'>
        <messages
          class='flex-grow ui-scroll-y'
          :messages='currentRoom.messages'>
        </messages>
        <users
          class='flex-fixed ui-width-5 color-main ui-scroll-y ui-divide-left res res-desktop'
          :users='currentRoom.characters'>
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
      currentRoomIndex: 0
    }
  },

  computed: {
    currentRoom () {
      return store.getCurrentRoom()
    }
  }
}
</script>
