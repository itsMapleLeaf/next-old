<template>
  <div class='chat-message flex-row'>
    <div class='flex-fixed'>
      <div class='chat-message-avatar' :style="avatarStyle"></div>
    </div class='flex-fixed'>
    <div>
      <div class='chat-message-sender'>
        <Character :name='sender.name' :gender='sender.gender'></Character>
      </div>
      <div class='chat-message-text' v-html='parsedMessage'></div>
    </div>
  </div>
</template>

<script>
import Character from './Character.vue'

import {getAvatarURL} from '../lib/f-list'
import {parse} from '../lib/bbc'

export default {
  props: {
    sender: Object,
    message: String
  },
  components: {
    Character
  },
  computed: {
    avatar () {
      return getAvatarURL(this.sender.name)
    },
    avatarStyle () {
      return { 'background-image': `url(${this.avatar})` }
    },
    parsedMessage () {
      return parse(this.message)
    }
  }
}
</script>

<style lang='stylus' scoped>
@require '../styles/mixins'

.chat-message
  padding: 0.5em

.chat-message-avatar
  size(40px)
  background-size: cover
  margin-right: 0.5em

.chat-message-sender
  margin-bottom: 0.2em
</style>
