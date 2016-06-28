<template>
  <div class='grid vertical stretch'>
    <div class='grid fixed room-description overflow-scroll bg-theme'>
      <span>{{{ viewState.description | bbcode }}}</span>
    </div>

    <div class='grid horizontal stretch'>
      <div class='grid vertical stretch messages overflow-scroll'>
        <ul>
          <li v-for='msg in viewState.messages'>
            <chat-message
            :character='msg.character'
            :message='msg.message'>
            </chat-message>
          </li>
        </ul>
      </div>

      <div class='grid vertical fixed user-list overflow-scroll bg-theme'>
        <ul>
          <li v-for='char in viewState.characters'>
            <character :character='char'></character>
          </li>
        </ul>
      </div>
    </div>

    <div class='grid horizontal fixed bg-theme chatbox'>
      <chatbox @message-sent='messageSent'></chatbox>
    </div>
  </div>
</template>

<style lang="stylus" scoped></style>

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
