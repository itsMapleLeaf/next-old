<template>
  <a class='character' href='#' :data-character='name'>
    <span :class='statusClass' v-if='status'>●</span>
    <span :class='genderClass'>{{ name }}</span>
  </a>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    gender: { type: String, default: 'none' },
    status: String,
  },
  computed: {
    statusClass() {
      return 'character-status-' + this.status.toLowerCase()
    },
    genderClass() {
      return 'character-gender-' + this.gender.toLowerCase()
    },
  },
}
</script>

<style lang='stylus' scoped>
@import 'elements/character'

.character
  font-weight: bold

.ignored
  opacity: 0.5
</style>
