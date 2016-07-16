<template>
  <a href='#' class="ui-link"
    :style="{ opacity: value ? 1 : 0.5 }"
    @click.prevent @keydown.space="$emit('click')">
    <i :class="'mdi mdi-' + iconClass"></i>
    <slot></slot>
  </a>
</template>

<style lang="stylus" scoped>
a
  font-size: 0.9em
  border-width: 1px

span
  display: inline-block
  padding: 0.3em 0.5em
</style>

<script>
export default {
  props: {
    value: Boolean
  },

  computed: {
    iconClass () {
      return this.value ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'
    }
  }
}
</script>
