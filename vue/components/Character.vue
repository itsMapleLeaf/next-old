<template>
  <a href='#' :class="'gender-color ' + gender" :data-character-action="character.name">
    <span :class="'status-color ' + status">●</span>
    <slot>{{character.name}}</slot>
  </a>
</template>

<style lang="stylus" scoped>
a
  font-weight: 700

i
  pointer-events: none

.status-color
  font-size: 0.9em
  vertical-align: top

  &.online { color: rgb(33, 150, 243) }
  &.looking { color: rgb(32, 223, 109) }
  &.busy { color: rgb(255, 152, 0) }
  &.away { color: rgb(255, 241, 118) }
  &.dnd { color: rgb(191, 77, 64) }
  &.idle { color: rgb(171, 124, 255) }
  &.offline { color: rgba(62, 62, 62, 0.3) }

.gender-color
  &.male { color: hsl(210, 50%, 60%) }
  &.female { color: hsl(5, 90%, 78%) }
  &.transgender { color: hsl(35, 65%, 60%) }
  &.herm { color: hsl(266, 83%, 72%) }
  &.shemale { color: hsl(307, 63%, 72%) }
  &.cunt-boy { color: hsl(134, 56%, 60%) }
  &.male-herm { color: hsl(225, 100%, 66%) }
  &.none { color: hsl(54, 42%, 76%) }

.ignored
  opacity: 0.5
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
