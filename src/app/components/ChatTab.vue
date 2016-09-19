<template>
  <a href='#' class='chat-tab' :class="{ 'chat-tab-active': active }" @click="$emit('selected')">
    <span v-if="tab.channel">
      <i class='mdi mdi-earth' v-if='tab.channel.name === tab.channel.id'></i>
      <i class='mdi mdi-key-variant' v-else></i>
      <span>{{ tab.channel.name }}</span>
      <a href='#' class='chat-tab-close' @click.stop="$emit('closed')">
        <i class='mdi mdi-close'></i>
      </a>
    </span>
  </a>
</template>

<script>
export default {
  props: {
    tab: Object,
    active: Boolean
  }
}
</script>

<style lang='stylus' scoped>
@require 'mixins/theme'

.chat-tab
  display: block
  padding: 0.4em 0.4em
  opacity: 0.5
  accent-border(left)

  +animate(hover)
    background: darken($theme-color, 20%)

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
</style>
