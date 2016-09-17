<template>
  <div class='chat-message flex-row' :class="type && 'chat-message-' + type">
    <div class='flex-fixed'>
      <div class='chat-message-avatar'>
        <a href='#' :data-character='sender.name'>
          <Avatar :name='sender.name' size='2.25em'></Avatar>
        </a>
      </div>
    </div>
    <div :class='actionClass'>
      <span class='chat-message-sender'>
        <Character :name='sender.name' :gender='sender.gender'></Character>
      </span>
      <span class='chat-message-text' v-html='parsedMessage'></span>
    </div>
  </div>
</template>

<script>
import Character from './Character.vue'
import Avatar from './Avatar.vue'

import {getAvatarURL} from '../lib/f-list'
import {parse} from '../lib/bbc'

export default {
  props: {
    sender: Object,
    message: String,
    type: String
  },
  components: {
    Character,
    Avatar
  },
  computed: {
    avatar () {
      return getAvatarURL(this.sender.name)
    },
    avatarStyle () {
      return { 'background-image': `url(${this.avatar})` }
    },
    isAction () {
      return this.message.substring(0, 3) === '/me'
    },
    actionClass () {
      return { 'chat-message-action': this.isAction }
    },
    parsedMessage () {
      return this.isAction
        ? parse(this.message.substring(4))
        : parse(this.message)
    }
  }
}
</script>

<style lang='stylus' scoped>
@require '../styles/mixins'
@require '../styles/colors'

.chat-message-lfrp
  highlight($green)

.chat-message
  padding: 0.5em 0.8em

.chat-message-avatar
  margin: 0.2em 0.5em 0.2em 0

.chat-message-sender
  margin-right: 0.25em

.chat-message-action
  font-style: italic
</style>
