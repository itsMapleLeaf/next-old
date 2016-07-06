<template>
  <a class='ui hover-darken' :class="{ 'theme-color main border': active }"
    @click.self="$emit('selected')">
    <span @click.self="$emit('selected')"><slot></slot></span>
    <i class="fa fa-times ui transition small" @click.prevent.stop="$emit('closed')"></i>
  </a>
</template>

<style lang="stylus" scoped>
@import '../../styles/ui.styl'

a
  width: 8em
  display: inline-block
  height: 2em
  border-bottom: 3px solid transparent
  user-select: none
  padding: 0.3em 0.5em
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
  position: relative

.fa
  position: absolute
  right: 0.5em
  top: 0.7em
  opacity: 0

a:hover
  padding-right: 1.3em

  .fa
    opacity: 0.5
</style>

<script>
export default {
  props: {
    active: Boolean
  }
}
</script>
