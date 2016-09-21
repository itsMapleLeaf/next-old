<template>
  <div class='message flex-row' :class="type && 'message-type-' + type">
    <div class='flex-fixed'>
      <div class='avatar'>
        <a href='#' :data-character='sender.name'>
          <Avatar :name='sender.name' size='2.25em'></Avatar>
        </a>
      </div>
    </div>
    <div class='flex-grow'>
      <span class='timestamp'>{{ parsedTime }}</span>
      <span :class='actionClass'>
        <span class='sender'>
          <Character :name='sender.name' :gender='sender.gender' :status='sender.status'></Character>
        </span>
        <span class='message-text' v-html='parsedMessage'></span>
      </span>
    </div>
  </div>
</template>

<script>
import Character from './Character.vue'
import Avatar from './Avatar.vue'

import {getAvatarURL} from '../lib/f-list'
import {parseBBC} from '../lib/bbc'

export default {
  props: {
    sender: Object,
    message: String,
    type: String,
    time: Number,
  },
  components: {
    Character,
    Avatar,
  },
  computed: {
    avatar() {
      return getAvatarURL(this.sender.name)
    },
    avatarStyle() {
      return { 'background-image': `url(${this.avatar})` }
    },
    isAction() {
      return this.message.substring(0, 3) === '/me'
    },
    actionClass() {
      return { 'message-action': this.isAction }
    },
    parsedMessage() {
      return this.isAction
        ? parseBBC(this.message.substring(4))
        : parseBBC(this.message)
    },
    parsedTime() {
      if (this.time) {
        const time = new Date(this.time)
        return time.toLocaleTimeString()
      }
    },
  },
}
</script>

<style lang='stylus' scoped>
@require 'elements/flex'
@require 'mixins/theme'
@require 'mixins/highlight'

.message
  padding: 0.3em 0.6em
  border-bottom: 1px solid theme-darker(40%)

.avatar
  margin: 0.2em 0.5em 0.2em 0

.sender
  margin-right: 0.25em

.timestamp
  font-size: 70%
  opacity: 0.5
  float: right
  padding-left: 1em

.message-action
  font-style: italic

.message-type-lfrp
  highlight($green)

.message-type-self
  background: theme-darker(40%)
  border-bottom: 1px solid theme-darker(50%)
</style>
