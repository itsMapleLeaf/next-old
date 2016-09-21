<template>
  <span class='description'>
    <span v-if='channel' v-html='parseBBC(channel.description)'></span>
    <span v-if='privateChat'>
      <Status :status='privateChat.partner.status' :statusmsg='privateChat.partner.statusmsg'>
      </Status>
    </span>
  </span>
</template>

<script>
import Status from './Status.vue'
import {parseBBC} from '../lib/bbc'

export default {
  props: {
    channel: Object,
    privateChat: Object,
  },
  components: {
    Status,
  },
  methods: {
    parseBBC,
  },
}
</script>

<style lang='stylus' scoped>
.description
  white-space: pre-wrap
</style>
