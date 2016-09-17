<template>
  <div class='avatar-image' :style='style'></div>
</template>

<script>
import {getAvatarURL} from '../lib/f-list'

export default {
  props: {
    name: String,
    size: String
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
.avatar-image
  filter: drop-shadow(0em 0.1em 0.15em rgba(black, 0.5))
  opacity: 1
  transition: 0.2s
  &:hover
    opacity: 0.7
</style>
