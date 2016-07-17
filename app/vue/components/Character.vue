<template>
  <a href='#' class="gender" :class="character.gender.toLowerCase()">
    <i class="mdi mdi-hexagon status" :class="character.status.toLowerCase()"></i>
    {{character.name}}
  </a>
</template>

<style lang="stylus" scoped>
a
  font-weight: 700

.status
  font-size: 40%
  position: relative
  top: -0.4em

  &.online { color: rgb(96, 94, 94) }
  &.looking { color: rgb(32, 223, 109) }
  &.busy { color: rgba(white, 0.5) }
  &.away { color: rgb(58, 111, 246) }
  &.idle { color: rgb(235, 237, 129) }
  &.dnd { color: rgb(191, 77, 64) }
  &.offline { color: rgba(62, 62, 62, 0.5) }

.gender
  &.male { color: hsl(210, 50%, 60%) }
  &.female { color: hsl(5, 90%, 78%) }
  &.transgender { color: hsl(35, 65%, 60%) }
  &.herm { color: hsl(266, 83%, 72%) }
  &.shemale { color: hsl(307, 63%, 72%) }
  &.cunt-boy { color: hsl(134, 56%, 60%) }
  &.male-herm { color: hsl(225, 100%, 66%) }
  &.none { color: hsl(54, 42%, 76%) }
</style>

<script>
import Character from '../types/Character'

export default {
  props: {
    character: Character
  }
}
</script>
