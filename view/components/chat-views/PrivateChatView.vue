<template>
  <div class='flex col stretch'>
    <header class='flex fixed ui theme-color main'>
      <character :character='viewState.character'></character>
      <em>
        <span>- {{viewState.character.status}}</span>
        <span v-if="viewState.character.statusMessage" v-html='", " + viewState.character.statusMessage | bbcode'></span>
      </em>
    </header>

    <!-- <div class='box divider'></div> -->

    <section class='flex stretch ui scroll'>
      <chat-message v-for='msg in viewState.messages'
      :character='msg.character'
      :message='msg.message'>
      </chat-message>
    </section>

    <!-- <div class='box divider'></div> -->

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
