<template>
  <div class='flex col stretch'>
    <header class='flex fixed ui theme-color main'>
      <character :character='viewState.character'></character>
      <em>
        <span>- {{viewState.character.status}}</span>
        <span v-if="viewState.character.statusMessage" v-html='", " + viewState.character.statusMessage | bbcode'></span>
      </em>
    </header>

    <div class='flex divider'></div>

    <chat-message-list class='flex stretch' :messages='viewState.messages'></chat-message-list>

    <div class='flex divider'></div>

    <section class='flex fixed ui theme-color main'>
      <chatbox @message-sent='messageSent'></chatbox>
    </section>
  </div>
</template>

<style lang="stylus" scoped>
header
  padding: 0.5em
</style>

<script>
import Chatbox from '../elements/Chatbox.vue'
import Character from '../elements/Character.vue'
import ChatMessage from '../elements/ChatMessage.vue'
import ChatMessageList from '../elements/ChatMessageList.vue'

export default {
  components: {
    Chatbox,
    Character,
    ChatMessage,
    ChatMessageList
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
