<template lang="pug">
mixin left-column
  user-menu-content.ui-width-6.ui-divide-right.res.res-desktop&attributes(attributes)

mixin middle-column
  .flex-column&attributes(attributes)
    .flex-fixed.color-dark.ui-height-2.ui-padding-3.ui-scroll-y.ui-pre-wrap(
      v-if="room.type === 'channel'")
      span(v-html="room.description || ''")
    .flex-fixed.color-dark.ui-height-1.ui-padding-2.ui-pre-wrap(v-if="room.type === 'private'")
      user-status(:status="room.partner.status", :statusmsg="room.partner.statusmsg")
    .flex-grow.ui-divide-bottom.ui-divide-top.ui-scroll-y.ui-break-word(v-bottom-scroll='')
      message-list(:messages="room ? room.messages : []")
    chatbox.flex-fixed.color-dark.ui-padding-4(
      @submit="$emit('chatbox-submit', arguments[0])",
      style="height: 5em")

mixin right-column
  .color-dark.ui-width-6.ui-divide-left.ui-scroll-y.res.res-desktop(v-if!="room && room.characters")&attributes(attributes)
    character-list(:users="room.characters", :oplist="room.ops")

.flex-row
  +left-column.flex-fixed
  +middle-column.flex-grow
  +right-column.flex-fixed
</template>

<script>
import CharacterList from './CharacterList.vue'
import MessageList from './MessageList.vue'
import Chatbox from './Chatbox.vue'
import UserStatus from './UserStatus.vue'
import UserMenuContent from './UserMenuContent.vue'
import ChannelRoom from '../models/ChannelRoom'
import PrivateRoom from '../models/PrivateRoom'
import {bottomScroll} from '../directives'

export default {
  props: {
    room: [ChannelRoom, PrivateRoom]
  },
  components: {
    CharacterList,
    UserMenuContent,
    MessageList,
    Chatbox,
    UserStatus
  },
  directives: {
    bottomScroll
  }
}
</script>
