<template>
  <a href='#' :class="'gender-color ' + gender" :data-character-action="character.name">
    <span :class="'status-color ' + status">●</span>
    <slot>{{character.name}}</slot>
  </a>
</template>

<style lang="stylus" scoped>
a
  font-weight: 700
</style>

<script>
import Character from '../types/Character'

export default {
  props: {
    character: Character
  },

  computed: {
    gender () { return this.character.gender.toLowerCase() },
    status () { return this.character.status.toLowerCase() }
  }
}
</script>
