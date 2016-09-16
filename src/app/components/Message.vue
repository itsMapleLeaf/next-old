<template>
  <div class='chat-message'>
    <div class='chat-message-sender'>
      <Character
        :name='sender.name'
        :gender='sender.gender'
        :status='sender.status'>
      </Character>
    </div>
    <div class='chat-message-text'>
      {{ message }}
    </div>
  </div>
</template>

<script>
import Character from './Character.vue'

export default {
  props: {
    sender: Object,
    message: String
  },
  components: {
    Character
  }
}
</script>

<style lang='stylus' scoped>
/*
  .chat-message-sender
    display: inline-block
    margin-right: 0.5em

  .chat-message-text
    display: inline-block*/
</style>
