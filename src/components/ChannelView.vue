<template>
  <div class='flex col stretch'>
    <div class='flex fixed ui theme-color main scroll'>
      <div class='description' v-html="viewState.description | bbcode"></div>
    </div>

    <div class='flex row stretch'>
      <div class='flex stretch scroll'>
        <ul>
          <li v-for='msg in viewState.messages'>
            <chat-message
            :character='msg.character'
            :message='msg.message'>
            </chat-message>
          </li>
        </ul>
      </div>

      <div class='flex fixed ui theme-color main scroll'>
        <ul>
          <li v-for='char in viewState.characters'>
            <character :character='char'></character>
          </li>
        </ul>
      </div>
    </div>

    <div class='flex fixed ui theme-color main'>
      <chatbox class='chatbox' @message-sent='messageSent'></chatbox>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.description
  height: 5em
  padding: 0.3em 0.5em
  white-space: pre-wrap
  line-height: 1.4

.chatbox
  height: 5em
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
