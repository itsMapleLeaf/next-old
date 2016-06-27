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

<style lang="stylus" scoped>
@import '../styles/layout'
@import '../styles/grid'
@import '../styles/typography'
@import '../styles/theme-colors'

.room-description
  height: 5em
  padding: 0.3em 0.5em
  line-height: 1.5

  span
    white-space: pre-wrap

.chatbox
  height: 5em

.user-list
  width: 12em

.user-list li
  padding: 0.2em 0.6em
  text-overflow: break-word

/*a
  @extend .text-underline

a:hover
  @extend .text-underline-bright*/

/*.header
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
    white-space: pre-wrap*/
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
