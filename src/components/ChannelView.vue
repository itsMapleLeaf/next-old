<template>
  <div class='box vertical grow'>
    <div class='header box fg-color scroll room-info'>
      <span>{{{ viewState.description | bbcode }}}</span>
    </div>

    <div class='box divider'></div>

    <div class='box horizontal grow'>
      <div class='box grow scroll'>
        <chat-message v-for='msg in viewState.messages'
        :character='msg.character'
        :message='msg.message'>
        </chat-message>
      </div>

      <div class='box divider'></div>

      <div class='sidebar box fg-color scroll'>
        <character v-for='char in viewState.characters'
        class='character-list-item hover-darken'
        :character='char'></character>
      </div>
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

.sidebar
  width: 12em

.character-list-item
  display: block
  padding: 0.2em 0.5em
  overflow-wrap: break-word

.room-info
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
