<template>
  <a class='character' href='#' :data-character='name'>
    <span class='status' :class='status.toLowerCase()'>●</span>
    <span class='gender' :class='gender.toLowerCase()'>{{ name }}</span>
  </a>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    gender: { type: String, default: 'none' },
    status: { type: String, default: 'offline' },
    statusmsg: { type: String, default: '' }
  }
}
</script>

<style lang='stylus' scoped>
.status
  &.online  { color: rgb(33, 150, 243) }
  &.looking { color: rgb(32, 223, 109) }
  &.busy    { color: rgb(255, 152, 0) }
  &.away    { color: rgb(255, 241, 118) }
  &.dnd     { color: rgb(198, 103, 93) }
  &.idle    { color: rgb(171, 124, 255) }
  &.offline { color: rgba(62, 62, 62, 0.3) }

.gender
  &.male        { color: hsl(210, 50%, 60%) }
  &.female      { color: hsl(5, 90%, 78%) }
  &.transgender { color: hsl(35, 65%, 60%) }
  &.herm        { color: hsl(266, 83%, 72%) }
  &.shemale     { color: hsl(307, 63%, 72%) }
  &.cunt-boy    { color: hsl(134, 56%, 60%) }
  &.male-herm   { color: hsl(225, 100%, 66%) }
  &.none        { color: rgb(227, 218, 145) }

.character
  font-weight: bold

.ignored
  opacity: 0.5
</style>
