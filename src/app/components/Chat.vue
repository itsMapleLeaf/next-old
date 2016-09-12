<template lang='pug'>
.chat.flex-row
  .option-bar.flex-fixed
    .tooltip-right(data-tooltip='Channels'): a.option-bar-option(href='#'): i.mdi.mdi-forum
    .tooltip-right(data-tooltip='Friends'): a.option-bar-option(href='#'): i.mdi.mdi-heart
    .tooltip-right(data-tooltip='Update Status'): a.option-bar-option(href='#'): i.mdi.mdi-account-settings
    .tooltip-right(data-tooltip='Settings'): a.option-bar-option(href='#'): i.mdi.mdi-settings
  resizable(right).active-chat-list.flex-fixed
    a.current(href='#')
      i.mdi.mdi-earth
      |  test
    a(href='#')
      i.mdi.mdi-earth
      |  test
    a(href='#')
      i.mdi.mdi-earth
      |  test
    a(href='#')
      i.mdi.mdi-key-variant
      |  test
    a(href='#')
      i.mdi.mdi-key-variant
      |  test
    a(href='#')
      i.mdi.mdi-key-variant
      |  test
  .divider
  .flex-grow.flex-column
    .room-settings.flex-fixed.flex-row
      .room-filters.flex-grow
        span.room-filter.tooltip-bottom(data-tooltip='test'): toggle Chat
        span.room-filter.tooltip-bottom(data-tooltip='test'): toggle LFRP
        span.room-filter.tooltip-bottom(data-tooltip='test'): toggle Admin
        span.room-filter.tooltip-bottom(data-tooltip='test'): toggle Friend
        span.room-filter.tooltip-bottom(data-tooltip='test'): toggle Self
      a.room-settings-button.flex-fixed.tooltip-bottom(data-tooltip='Room Settings', href='#')
        i.mdi.mdi-tune
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
import Toggle from './Toggle.vue'

export default {
  components: {
    Resizable,
    Toggle
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
    font-size: 130%
    padding: 0.4em 0.5em

.active-chat-list
  background: $theme-color
  width: 8em
  width-limit: 6em 20em

  a
    accent-border(left)
    display: block
    padding: 0.3em 0.6em
    opacity: 0.5
    animate()

    &:hover
      background: darken($theme-color, 20%)

    &.current
      background: darken($theme-color, 30%)
      opacity: 1

    &:not(.current)
      border-color: transparent

.user-list
  background: $theme-color
  width: 8em
  width-limit: 6em 20em

.room-settings
  flex-align(center)
  background: darken($theme-color, 30%)

  .room-filter
    margin: 0.4em 0 0.4em 0.7em

  .room-settings-button
    padding: 0.3em
    font-size: 130%
    opacity: 0.5
    animate()

    &:hover
      opacity: 1

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
