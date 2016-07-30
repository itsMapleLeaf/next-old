<template>
  <div>
    <message v-for='message in messages' class='ui-padding-1'
      :message='message.message'
      :sender='message.sender'>
    </message>
  </div>
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
