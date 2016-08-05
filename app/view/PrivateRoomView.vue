<template lang="jade">
.flex-column
  .flex-fixed.color-main.ui-padding-2.ui-scroll-y.res.res-desktop(style='height: 4rem')
    status(:status='room.partner.status', :statusmsg='room.partner.statusmsg')
  messages.flex-grow.ui-scroll-y(:messages='room.messages')
  chatbox.flex-fixed.color-main.ui-block.ui-padding-2(style='height: 4rem', @message-sent='messageSent')
</template>

<script>
import Status from './UserStatus.vue'
import Messages from './MessageList.vue'
import Chatbox from './Chatbox.vue'
import PrivateRoom from '../models/PrivateRoom'
import socket from '../socket'

export default {
  components: {Status, Messages, Chatbox},
  props: {
    room: PrivateRoom
  },
  methods: {
    messageSent (message) {
      socket.sendPrivateMessage(this.room.partner.name, message)
    }
  }
}
</script>
