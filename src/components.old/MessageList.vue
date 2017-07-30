<template>
  <div v-bottom-scroll>
    <div class='chat-message' v-for='msg in messages'>
      <Message v-bind='msg'></Message>
    </div>
  </div>
</template>

<style lang='stylus' scoped>
@import 'vars'

.chat-message
  &:nth-child(2n)
    background: theme-darker(20%)
</style>

<script>
import Message from './Message.vue'
import {bottomScroll} from '../directives'

export default {
  components: {
    Message,
  },
  props: {
    messages: Array,
  },
  directives: {
    bottomScroll,
  }
}
</script>
