<template>
  <overlay header='Channel List'>
    <div class='selection-list'>
      <a href='#' v-for='ch of channels'>
        <span class='channel-name'>{{ ch.name }}</span>
        <span class='channel-user-count'>{{ ch.users }}</span>
      </a>
    </div>
  </overlay>
</template>

<script>
import Overlay from './Overlay.vue'

export default {
  components: {
    Overlay
  },
  data () {
    return {
      channels: []
    }
  },
  created () {
    for (let i = 1; i <= 20; i++) {
      this.channels.push({ name: 'Channel' + i, users: 420 })
    }
  }
}
</script>

<style lang='stylus' scoped>
.selection-list
  width: 14em
  max-height: 18em

.channel-user-count
  float: right
</style>
