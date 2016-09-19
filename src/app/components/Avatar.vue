<template>
  <span :style='style'></span>
</template>

<script>
import {getAvatarURL} from '../lib/f-list'

export default {
  props: {
    name: String,
    size: String,
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
@require 'mixins/theme'

span
  display: inline-block
  filter: drop-shadow(0em 0.1em 0.15em rgba(black, 0.5))
  opacity: 1

  +animate(hover, $properties: opacity)
    opacity: 0.7
</style>
