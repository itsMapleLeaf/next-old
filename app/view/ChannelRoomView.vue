<template lang='jade'>
.flex-column
  .flex-fixed.color-main.ui-padding-2.ui-scroll-y.res.res-desktop(style='height: 4rem', v-html='room.description')
  .flex-grow.flex.flex-align-stretch.ui-divide-top.ui-divide-bottom
    messages.flex-grow.ui-scroll-y(:messages='room.messages')
    users.flex-fixed.ui-width-6.color-main.ui-scroll-y.ui-divide-left.res.res-desktop(:users='room.characters', :ops='room.ops')
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
