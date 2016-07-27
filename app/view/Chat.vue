<template>
  <div class='color-dark flex-column'>
    <template v-if='currentRoom != null'>
      <div
        class='flex-fixed color-main ui-padding-2 ui-scroll-y ui-pre-wrap res res-desktop'
        style='height: 5rem'
        v-html='currentRoom.description'>
      </div>
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
      <chatbox
        class='flex-fixed color-main ui-divide-top'
        style='height: 5rem'>
      </chatbox>
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
