<template>
  <div class='box vertical grow'>
    <div class='box fg-color scroll header'>
      <character :character='viewState.character'></character>
      <span style="margin-left: 0.3em">
        - {{viewState.character.status}}, <span v-html='viewState.character.statusMessage | bbcode'></span>
      </span>
    </div>

    <div class='box divider'></div>

    <div class='box grow scroll'>
      <chat-message v-for='msg in viewState.messages'
      :character='msg.character'
      :message='msg.message'>
      </chat-message>
    </div>

    <div class='box divider'></div>

    <div class='box fg-color'>
      <chatbox @message-sent='messageSent'></chatbox>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.header
  height: 5em
  padding: 0.3em 0.5em
  line-height: 1.5

  span
    white-space: pre-wrap
</style>

<script>
import Chatbox from './Chatbox.vue'
import Character from './Character.vue'
import ChatMessage from './ChatMessage.vue'

export default {
  components: {
    Chatbox,
    Character,
    ChatMessage
  },

  props: {
    viewState: Object
  },

  methods: {
    messageSent (message) {
      this.$emit('message-sent', message)
    }
  }
}
</script>
