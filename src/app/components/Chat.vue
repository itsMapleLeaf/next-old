<template lang='pug'>
.chat.flex-row
  .option-bar.flex-fixed
    div(data-tooltip='Channels'): a.option-bar-option(href='#'): i.mdi.mdi-forum
    div(data-tooltip='Friends'): a.option-bar-option(href='#'): i.mdi.mdi-heart
    div(data-tooltip='Update Status'): a.option-bar-option(href='#'): i.mdi.mdi-account-settings
    div(data-tooltip='Settings'): a.option-bar-option(href='#'): i.mdi.mdi-settings
  .divider
  resizable(right).active-chat-list.flex-fixed
  .divider
  .flex-grow.flex-column
    .room-settings.flex-fixed
    .divider
    resizable(bottom).room-description.flex-fixed
    .divider
    .chat-messages.flex-grow
    .divider
    resizable(top).chat-input.flex-fixed
      textarea.textarea(ref='chatInput')
  .divider
  resizable(left).user-list.flex-fixed
</template>

<script>
import Resizable from './Resizable.vue'

export default {
  components: {
    Resizable
  },
  mounted () {
    window.addEventListener('keydown', this.focusChatInput)
  },
  destroyed () {
    window.removeEventListener('keydown', this.focusChatInput)
  },
  methods: {
    focusChatInput () {
      this.$refs.chatInput.focus()
    }
  }
}
</script>

<style lang='stylus' scoped>
@require '../styles/mixins'
@require '../styles/colors'

.flex-row
  flex(row)

.flex-column
  flex(column)

.flex-grow
  flex-grow: 1

.flex-fixed
  flex-shrink: 0

.divider
  size: 3px
  visibility: hidden
  flex-shrink: 0

.chat
  size: 100%
  background: darken($theme-color, 50%)

.option-bar
  padding: 0.3em 0
  background: darken($theme-color, 30%)

  a
    active-animation()
    font-size: 120%
    padding: 0.3em 0.5em

.active-chat-list
  background: $theme-color
  width: 8em
  width-limit: 6em 20em

.user-list
  background: $theme-color
  width: 8em
  width-limit: 6em 20em

.room-settings
  background: darken($theme-color, 30%)
  height: 2em

.chat-messages
  background: darken($theme-color, 30%)

.room-description
  background: darken($theme-color, 10%)
  height: 5em

.chat-input
  background: darken($theme-color, 10%)
  height: 5em

  textarea
    display: block
    size: 100%

    &:focus
      background: darken($theme-color, 40%)
</style>
