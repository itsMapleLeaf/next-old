<template>
  <div class='flex col stretch'>
    <!-- description -->
    <div class='flex fixed ui theme-color main scroll description'>
      <span v-html="viewState.description | bbcode"></span>
    </div>

    <div class='flex row stretch'>
      <!-- message -->
      <chat-message-list class="flex stretch" :messages='viewState.messages'></chat-message-list>

      <!-- users -->
      <div class='flex fixed ui theme-color main scroll character-list'>
        <ul>
          <li class='ui hover-darken' v-for='char in viewState.characters'>
            <character class='character-list-item' :character='char'></character>
          </li>
        </ul>
      </div>
    </div>

    <!-- chatbox -->
    <div class='flex fixed ui theme-color main'>
      <chatbox class='chatbox' @message-sent='messageSent'></chatbox>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
ul
  list-style: none

.description
  height: 5em
  padding: 0.3em 0.5em
  line-height: 1.4

  span
    white-space: pre-wrap

.chatbox
  height: 5em

.character-list
  width: 12em

.character-list-item
  display: block
  padding: 0.2em 0.6em

.message-list
  padding: 0.3em 0em
</style>

<script>
import Chatbox from './Chatbox.vue'
import Character from './Character.vue'
import ChatMessage from './ChatMessage.vue'
import ChatMessageList from './ChatMessageList.vue'

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
