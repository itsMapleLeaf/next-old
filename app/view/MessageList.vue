<template>
  <div>
    <message v-for='msg in messages' :message='msg'
      class='ui-padding-1'>
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
