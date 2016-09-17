<template>
  <div class='avatar' :style='style'></div>
</template>

<script>
import {getAvatarURL} from '../lib/f-list'

export default {
  props: {
    name: String,
    size: Number
  },
  computed: {
    style () {
      return `
        width: ${this.size || '100px'};
        height: ${this.size || '100px'};
        background-image: url(${getAvatarURL(this.name)});
        background-size: cover;
      `
    }
  }
}
</script>

<style lang='stylus' scoped>
.avatar
  filter: drop-shadow(0px 2px 4px rgba(black, 0.5))
</style>
