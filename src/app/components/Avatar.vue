<template>
  <span class='avatar' :class="shadow && 'shadow'" :style='style'></span>
</template>

<script>
import {getAvatarURL} from '../lib/f-list'

export default {
  props: {
    name: String,
    size: String,
    shadow: Boolean,
  },
  computed: {
    style() {
      return `
        width: ${this.size || '100px'};
        height: ${this.size || '100px'};
        background-image: url(${getAvatarURL(this.name)});
        background-size: cover;
      `
    },
  },
}
</script>

<style lang='stylus' scoped>
@require 'theme'

.avatar
  display: inline-block

.shadow
  filter: drop-shadow(0em 0.1em 0.15em rgba(black, 0.5))
</style>
