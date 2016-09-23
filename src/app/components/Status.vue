<template>
  <span>
    <span :class="'character-status-' + status">{{ status }}</span>
    <span v-if='parsedStatus' v-html="parsedStatus"></span>
  </span>
</template>

<script>
import {parseBBC} from '../lib/bbc'

export default {
  props: {
    status: String,
    statusmsg: String,
  },
  computed: {
    parsedStatus() {
      return this.statusmsg ? `- ${parseBBC(this.statusmsg)}` : ''
    },
  },
}
</script>

<style lang='stylus' scoped>
@require 'character'
</style>
