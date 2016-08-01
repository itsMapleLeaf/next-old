<template lang='jade'>
.flex-column
  .flex-fixed.color-main.ui-padding-2.ui-scroll-y.res.res-desktop(style='height: 4rem')
    status(:status='room.partner.status', :statusmsg='room.partner.statusmsg')
  messages.flex-grow.ui-scroll-y(:messages='room.messages')
</template>

<script>
import Status from './UserStatus.vue'
import Messages from './MessageList.vue'
import PrivateRoom from '../models/PrivateRoom'

export default {
  components: {Status, Messages},
  props: {
    room: PrivateRoom
  }
}
</script>
