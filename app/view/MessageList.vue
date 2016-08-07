<template lang="jade">
.flex-column
  .flex-grow.ui-scroll-y
    message.ui-padding-1(v-for='msg in filteredMessages', :key='msg.id', :message='msg')
  .flex-fixed.color-darker.ui-padding-1
    checkbox(v-for='filter of filters', v-model='filter.enabled', style='margin-right: 0.7rem')
      | {{ filter.label }}
</template>

<script>
import Message from './Message.vue'
import Checkbox from './Checkbox.vue'

export default {
  components: {Message, Checkbox},

  props: {
    messages: Array
  },
  
  data () {
    return {
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

  computed: {
    filteredMessages () {
      // lol
      const findEnabledFilter = msg => filter => filter.enabled && filter.filter(msg)
      const isMessageFiltered = msg => this.filters.some(findEnabledFilter(msg))
      return this.messages.filter(isMessageFiltered)
    }
  }
}
</script>
