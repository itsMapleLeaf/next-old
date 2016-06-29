<template>
  <div class='flex col stretch'>
    <!-- description -->
    <div class='flex fixed ui theme-color main scroll description'>
      <span v-html="viewState.description | bbcode"></span>
    </div>

    <div class='flex row stretch'>
      <!-- message -->
      <div class='flex stretch ui scroll message-list' v-el:message-list>
        <ul>
          <li v-for='msg in viewState.messages'>
            <chat-message
            :character='msg.character'
            :message='msg.message'
            </chat-message>
          </li>
        </ul>
      </div>

      <!-- users -->
      <div class='flex fixed ui theme-color main scroll character-list'>
        <ul>
          <li class='ui hover-darken' v-for='char in viewState.characters'>
            <character :character='char'>
            </character>
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

  li
    padding: 0.2em 0.6em

.message-list
  padding: 0.3em 0em
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

  created () {
    this.$watch('viewState', () => {
      const element = this.$els.messageList
      element.scrollTop = element.scrollHeight
    })

    // TODO: make this immediate + remove threshold
    this.$watch('viewState.messages', () => {
      const element = this.$els.messageList
      if (element.scrollTop + element.clientHeight > element.scrollHeight - 100) {
        element.scrollTop = element.scrollHeight
      }
    })
  },

  methods: {
    messageSent (message) {
      this.$emit('message-sent', message)
    }
  }
}
</script>
