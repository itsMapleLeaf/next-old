<template>
  <textarea v-model='message' @keydown.enter.prevent='submit'></textarea>
</template>

<script>
export default {
  data() {
    return { message: '' }
  },
  methods: {
    submit() {
      this.$emit('submit', this.message)
      this.message = ''
    },
  },
}
</script>

<style lang='stylus' scoped>
@require 'theme'
@require 'animate'

textarea
  padding: 0.3em 0.6em
  +animate(focus)
    background: theme-darker(40%)
</style>
