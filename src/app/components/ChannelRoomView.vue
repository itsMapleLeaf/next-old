<template lang="pug">
mixin description
  .flex-fixed.color-main.ui-padding-2.ui-scroll-y.res.res-desktop(style='height: 4rem', v-html='room.description')

mixin messages
  messages.flex-grow.ui-scroll-y(:messages='filteredMessages')

mixin filters
  .flex-fixed.color-darker.ui-padding-1
    template(v-for='(filter, index) of filters', v-if='!filter.visible || filter.visible()')
      checkbox(:key='index', v-model='filter.enabled', style='margin-right: 0.7rem') {{ filter.label }}

mixin character-list
  users.flex-fixed.ui-width-6.color-main.ui-scroll-y.ui-divide-left.res.res-desktop(:users='room.characters', :ops='room.ops')

mixin chatbox
  chatbox.flex-fixed.color-main.ui-block.ui-padding-2(style='height: 4rem', @message-sent='messageSent')

.flex-column
  +description
  .flex-grow.flex.flex-align-stretch.ui-divide-top.ui-divide-bottom
    .flex-grow.flex-column
      +messages
      +filters
    +character-list
  +chatbox
</template>

<script>
import Messages from './MessageList.vue'
import Users from './UserList.vue'
import Chatbox from './Chatbox.vue'
import Checkbox from './Checkbox.vue'
import ChannelRoom from '../models/ChannelRoom'
import * as store from '../store'

export default {
  components: {Messages, Users, Chatbox, Checkbox},

  data () {
    return {
      state: store.state,
      filters: [
        {
          label: 'Chat',
          enabled: true,
          filter: msg => msg.type === 'chat'
        },
        {
          label: 'LFRP',
          enabled: true,
          filter: msg => this.room.mode === 'ads' || msg.type === 'lfrp',
          visible: () => this.room.mode === 'both'
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
