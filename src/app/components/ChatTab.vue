<template>
  <a href='#' class='chat-tab' :class="{ 'chat-tab-active': active }" @click="$emit('selected')">
    <span v-if="tab.channel">
      <i class='mdi mdi-earth' v-if='tab.channel.name === tab.channel.id'></i>
      <i class='mdi mdi-key-variant' v-else></i>
      <span>{{ tab.channel.name }}</span>
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
@require '../styles/mixins'
@require '../styles/colors'

.chat-tab
  display: block
  padding: 0.3em 0.3em
  opacity: 0.5
  animate()
  accent-border(left)

  &:hover
    background: darken($theme-color, 20%)

.chat-tab-active
  opacity: 1
  background: darken($theme-color, 20%)

:not(.chat-tab-active)
  border-color: transparent
</style>
