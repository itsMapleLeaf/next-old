<template>
  <a class='ui hover-darken' :class="{ 'theme-color main border': active }">
    <span><slot></slot></span>
  </a>
</template>

<style lang="stylus" scoped>
a
  width: 8em
  height: 2em
  border-bottom: 3px solid transparent
  user-select: none
  padding: 0.3em 1em
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
</style>

<script>
export default {
  props: {
    active: Boolean
  }
}
</script>
