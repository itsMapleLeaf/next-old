<template lang="jade">
.flex-column
  // room description
  .flex-fixed.color-main.ui-padding-2.ui-scroll-y.res.res-desktop(style='height: 4rem', v-html='room.description')
  .flex-grow.flex.flex-align-stretch.ui-divide-top.ui-divide-bottom
    .flex-grow.flex-column
      // chat messages
      messages.flex-grow.ui-scroll-y(:messages='filteredMessages')
      // filters
      .flex-fixed.color-darker.ui-padding-1
        checkbox(v-for='filter of filters', v-model='filter.enabled', style='margin-right: 0.7rem')
          | {{ filter.label }}
    // character list
    users.flex-fixed.ui-width-6.color-main.ui-scroll-y.ui-divide-left.res.res-desktop(:users='room.characters', :ops='room.ops')
  // chatbox
  chatbox.flex-fixed.color-main.ui-block.ui-padding-2(style='height: 4rem', @message-sent='messageSent')
</template>

<script>
import Messages from './MessageList.vue'
import Users from './UserList.vue'
import Chatbox from './Chatbox.vue'
import Checkbox from './Checkbox.vue'
import ChannelRoom from '../models/ChannelRoom'
import {state, store} from '../store'

export default {
  components: {Messages, Users, Chatbox, Checkbox},

  data () {
    return {
      state,
      filters: [
        {
          label: 'Chat',
          enabled: true,
          filter: msg => msg.type === 'chat'
        },
        {
          label: 'LFRP',
          enabled: true,
          filter: msg => msg.type === 'lfrp'
        },
        {
          label: 'Friends',
          enabled: true,
          filter: msg => msg.sender.isFriend || msg.sender.isBookmark
        },
        {
          label: 'Admin',
          enabled: true,
          filter: msg => msg.type === 'admin'
        },
        {
          label: 'Self',
          enabled: true,
          filter: msg => msg.type === 'self'
        }
      ]
    }
  },

  props: {
    room: ChannelRoom
  },

  methods: {
    messageSent (message) {
      store.sendChannelMessage(this.room.id, message)
      store.addChannelMessage(this.room.id, this.state.identity, message, 'self')
    }
  },

  computed: {
    filteredMessages () {
      // lol
      const findEnabledFilter = msg => filter => filter.enabled && filter.filter(msg)
      const isMessageFiltered = msg => this.filters.some(findEnabledFilter(msg))
      return this.room.messages.filter(isMessageFiltered)
    }
  }
}
</script>
