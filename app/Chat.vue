<template>
  <div class='chat ui-color-dark flex-column'>
    <description class='flex-fixed ui-color-main ui-height-2 ui-desktop'>
      test description
    </description>
    <div class='flex-grow flex flex-align-stretch ui-divide-top'>
      <messages class='flex-grow ui-scroll-y' :messages='messages'></messages>
      <users class='ui-desktop flex-fixed ui-width-5 ui-color-main ui-scroll-y ui-divide-left' :users='users'></users>
    </div>
    <chatbox class='flex-fixed ui-color-main ui-height-2 ui-divide-top'></chatbox>
    <users v-if='showUserList' class='ui-mobile ui-width-5 ui-scroll-y ui-color-main ui-anchor-right ui-shadow' :users='users'></users>
  </div>
</template>

<script>
import Description from './RoomDescription.vue'
import Users from './UserList.vue'
import Messages from './MessageList.vue'
import Chatbox from './Chatbox.vue'

export default {
  components: {Description, Users, Messages, Chatbox},

  data () {
    return {
      users: Array(100).fill({ name: 'motherfucker mike' }),
      messages: Array(100).fill({ sender: 'some bitch', text: 'fuck you' }),
      tabs: [
        { title: 'test' },
        { title: 'test' },
        { title: 'test' },
        { title: 'test' },
        { title: 'test' }
      ],
      showUserList: false
    }
  }
}
</script>
