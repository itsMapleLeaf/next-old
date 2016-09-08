<template lang="pug">
mixin option-icon(icon, action)
  a.ui-padding-subtle(href='#', @click!=action)
    i.mdi(class="mdi-" + icon)

mixin user-options
  .color-dark.flex-column&attributes(attributes)
    +option-icon('menu', "pushOverlay('user-menu')")
    +option-icon('forum', "pushOverlay('channel-select')")
    +option-icon('heart', "pushOverlay('character-browser')")
    +option-icon('logout')
    +option-icon('account-settings')
    +option-icon('settings')

mixin room-options
  .color-dark.flex-column&attributes(attributes)
    +option-icon('account-multiple')

mixin left-column
  user-menu-content.ui-width-6.ui-divide-right.res.res-desktop&attributes(attributes)

mixin filter-toggle(value, label, description)
  button.ui-button(:class=`{'ui-faded': !${value}}`, title!=description, @click=`${value} = !${value}`)!= label

//- mixin filters
  .color-darker&attributes(attributes)
    +filter-toggle('filters.chat', 'Chat', "Show normal chat messages.")
    +filter-toggle('filters.lfrp', 'LFRP', "Show messages from friends and bookmarks.")
    +filter-toggle('filters.friend', 'Friend', "Show LFRP ads.")
    +filter-toggle('filters.admin', 'Admin', "Show your own messages.")
    +filter-toggle('filters.self', 'Self', "Show important messages from admins.")

mixin middle-column
  .flex-column&attributes(attributes)
    template(v-if="room && room.type === 'channel'")
      .flex-fixed.color-main.ui-padding-2
        h2 {{ room.name }}
    template(v-if="room && room.type === 'private'")
      .flex-fixed.color-main.ui-height-1.ui-padding-2.ui-pre-wrap
        user-status(:status="room.partner.status", :statusmsg="room.partner.statusmsg")
    .flex-grow.ui-divide-bottom.ui-divide-top.ui-scroll-y.ui-break-word(v-bottom-scroll='')
      message-list(:messages="room ? room.messages : []")
    chatbox.flex-fixed.color-main.ui-padding-4(
      @submit="$emit('chatbox-submit', arguments[0])",
      style="height: 5em")

mixin right-column
  .color-dark.ui-width-6.ui-divide-left.ui-scroll-y.res.res-desktop(v-if!="room && room.characters")&attributes(attributes)
    character-list(:users="room.characters", :oplist="room.ops")

.flex-row.color-darker
  +user-options.flex-fixed.ui-divide-right
  //- +left-column.flex-fixed
  +middle-column.flex-grow
  //- +right-column.flex-fixed
  +room-options.flex-fixed.ui-divide-left
</template>

<script>
import CharacterList from './CharacterList.vue'
import MessageList from './MessageList.vue'
import Chatbox from './Chatbox.vue'
import UserStatus from './UserStatus.vue'
import UserMenuContent from './UserMenuContent.vue'
import UserMenuOptions from './UserMenuOptions.vue'
import Checkbox from './Checkbox.vue'

import {pushOverlay} from '../store'
import ChannelRoom from '../models/ChannelRoom'
import PrivateRoom from '../models/PrivateRoom'
import {bottomScroll} from '../directives'

export default {
  props: {
    room: [ChannelRoom, PrivateRoom]
  },
  data () {
    return {
      filters: {
        chat: true,
        lfrp: true,
        self: true,
        friend: true,
        admin: true
      }
    }
  },
  methods: {
    pushOverlay
  },
  components: {
    CharacterList,
    UserMenuContent,
    UserMenuOptions,
    MessageList,
    Chatbox,
    UserStatus,
    Checkbox
  },
  directives: {
    bottomScroll
  }
}
</script>
