<template lang="jade">
div
  message.ui-padding-1(v-for='msg in messages', :message='msg')
</template>

<script>
import Message from './Message.vue'

export default {
  components: {Message},
  props: {
    messages: Array
  }
}
</script>
