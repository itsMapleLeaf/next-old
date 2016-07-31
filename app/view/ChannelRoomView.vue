<template>
  <div class='flex-column'>
    <div class='flex-fixed color-main ui-padding-2 ui-scroll-y res res-desktop'
      style='height: 4rem'
      v-html='room.description'>
    </div>
    <div class='flex-grow flex flex-align-stretch ui-divide-top ui-divide-bottom'>
      <messages class='flex-grow ui-scroll-y' :messages='room.messages'></messages>
      <users class='flex-fixed ui-width-6 color-main ui-scroll-y ui-divide-left res res-desktop'
        :users='room.characters' :ops='room.ops'>
      </users>
    </div>
  </div>
</template>

<script>
import Messages from './MessageList.vue'
import Users from './UserList.vue'
import ChannelRoom from '../models/ChannelRoom'

export default {
  components: {Messages, Users},
  props: {
    room: ChannelRoom
  }
}
</script>
