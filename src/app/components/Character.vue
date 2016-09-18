<template>
  <a class='character' href='#' :data-character='name'>
    <span :class="'character-status-' + status.toLowerCase()" v-if='status'>●</span>
    <span :class="'character-gender-' + gender.toLowerCase()">
      {{ name }}
    </span>
  </a>
</template>

<script>
import {store} from '../store'

export default {
  props: {
    name: { type: String, required: true },
    gender: { type: String, default: 'none' },
    status: String
  }
}
</script>

<style lang='stylus' scoped>
@import 'elements/user-colors'

.character
  font-weight: bold

.ignored
  opacity: 0.5
</style>
