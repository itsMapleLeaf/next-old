<template lang='pug'>
.chat.flex-row
  .option-bar.flex-fixed
    tooltip(right, text='Channels')
      a.option-bar-option(href='#'): i.mdi.mdi-forum
    tooltip(right, text='Online Characters')
      a.option-bar-option(href='#'): i.mdi.mdi-account-multiple
    tooltip(right, text='Update Status')
      a.option-bar-option(href='#'): i.mdi.mdi-account-settings
    tooltip(right, text='Settings')
      a.option-bar-option(href='#'): i.mdi.mdi-settings
  resizable(right).active-chat-list.flex-fixed
    a.current(href='#')
      i.mdi.mdi-earth
      span  Fantasy
    a(href='#')
      i.mdi.mdi-earth
      span  Story Driven RP
    a(href='#')
      i.mdi.mdi-earth
      span  RP Bar
    a(href='#')
      i.mdi.mdi-key-variant
      span  RP Dark City
    a(href='#')
      i.mdi.mdi-key-variant
      span  Lesbians
    a(href='#')
      i.mdi.mdi-key-variant
      span  Frontpage
  .divider
  .flex-grow.flex-column
    .room-settings.flex-fixed.flex-row
      .room-filters.flex-grow
        tooltip(text='Normal Messages', bottom, inline)
          toggle.room-filter(value) Chat
        tooltip(text='RP Ads', bottom, inline)
          toggle.room-filter(value) LFRP
        tooltip(text='Red Admin Messages', bottom, inline)
          toggle.room-filter(value) Admin
        tooltip(text='Friend and Bookmark Messages', bottom, inline)
          toggle.room-filter(value) Friend
        tooltip(text='Your Messages', bottom, inline)
          toggle.room-filter(value) Self
      tooltip(bottom, text='Room Settings')
        a.room-settings-button(href='#')
          i.mdi.mdi-tune
    .divider
    resizable(bottom).room-description.flex-fixed.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
      culpa qui officia deserunt mollit anim id est laborum.
    .divider
    .chat-messages.flex-grow
      .message
        .sender: character.user(name='AwesomeCharacter', gender='Male')
        .message-text This is a chat message.
      .message
        .sender: character.user(name='AwesomeCharacter', gender='Female')
        .message-text This is a chat message.
      .message
        .sender: character.user(name='AwesomeCharacter', gender='Transgender')
        .message-text This is a chat message.
      .message
        .sender: character.user(name='AwesomeCharacter', gender='Herm')
        .message-text This is a chat message.
      .message
        .sender: character.user(name='AwesomeCharacter', gender='Shemale')
        .message-text This is a chat message.
      .message
        .sender: character.user(name='AwesomeCharacter', gender='Male-herm')
        .message-text This is a chat message.
      .message
        .sender: character.user(name='AwesomeCharacter', gender='None')
        .message-text This is a chat message.
    .divider
    resizable(top).chat-input.flex-fixed
      textarea.textarea(placeholder='Chatting as Nobody...', ref='chatInput')
  .divider
  resizable(left).user-list.flex-fixed
    .user-count Users: 420
    character.user(name='AwesomeCharacter' gender='Male')
    character.user(name='AwesomeCharacter' gender='Female')
    character.user(name='AwesomeCharacter' gender='Transgender')
    character.user(name='AwesomeCharacter' gender='Herm')
    character.user(name='AwesomeCharacter' gender='Shemale')
    character.user(name='AwesomeCharacter' gender='Male-herm')
    character.user(name='AwesomeCharacter' gender='None')
</template>

<script>
import Resizable from './Resizable.vue'
import Toggle from './Toggle.vue'
import Tooltip from './Tooltip.vue'
import Character from './Character.vue'

export default {
  components: {
    Resizable,
    Toggle,
    Tooltip,
    Character
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
  width: 10em
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
  width: 10em
  width-limit: 6em 20em

  .user-count
    background: darken($theme-color, 20%)
    padding: 0.3em 0.6em

  .user
    display: block
    padding: 0.2em 0.5em

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

  .message
    margin-top: 0.3em
    margin-left: 0.5em

    .sender
      display: inline-block
      margin-right: 0.5em

    .message-text
      display: inline-block

.room-description
  background: darken($theme-color, 10%)
  height: 5em
  padding: 0.3em 0.6em
  overflow-y: auto

.chat-input
  background: darken($theme-color, 10%)
  height: 5em

  textarea
    display: block
    size: 100%

    &:focus
      background: darken($theme-color, 40%)
</style>
