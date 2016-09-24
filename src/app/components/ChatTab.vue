<template>
  <a href='#' class='chat-tab' :class="active && 'chat-tab-active'" @click="$emit('selected')">
    <template v-if='tab.channel'>
      <i class='mdi mdi-earth' v-if='tab.channel.name === tab.channel.id'></i>
      <i class='mdi mdi-key-variant' v-else></i>
      <span class='tab-text'>{{ tab.channel.name }}</span>
    </template>
    <template v-if='tab.privateChat'>
      <Avatar :name='tab.privateChat.partner.name' size='1em'></Avatar>
      <span class='tab-text'>{{ tab.privateChat.partner.name }}</span>
    </template>
    <a href='#' class='chat-tab-close' @click.stop="$emit('closed')">
      <i class='mdi mdi-close'></i>
    </a>
  </a>
</template>

<script>
import Avatar from './Avatar.vue'

export default {
  props: {
    tab: Object,
    active: Boolean,
  },
  components: {
    Avatar,
  },
}
</script>

<style lang='stylus' scoped>
@require 'theme'
@require 'animate'

.chat-tab
  accent-border(left)
  display: block
  padding: 0.4em 0.4em
  opacity: 0.5
  transition: 0.2s

  &:hover
    background: theme-darker(20%)

.chat-tab-active
  opacity: 1
  background: darken($theme-color, 20%)

:not(.chat-tab-active)
  border-color: transparent

.chat-tab-close
  opacity: 0.3
  float: right

  &:hover
    opacity: 0.8

.tab-text
  margin-left: 0.2em
</style>
