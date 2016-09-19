<template>
  <span>
    <span :class="'character-status-' + status">{{ status }}</span>
    <span v-if='parsedStatus' v-html="' - ' + parsedStatus"></span>
  </span>
</template>

<script>
import {parse} from '../lib/bbc'

export default {
  props: {
    status: String,
    statusmsg: String,
  },
  computed: {
    parsedStatus() {
      return this.statusmsg ? parse(this.statusmsg) : ''
    },
  },
}
</script>

<style lang='stylus' scoped>
@require 'elements/character'
</style>
