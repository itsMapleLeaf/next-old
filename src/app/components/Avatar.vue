<template>
  <a :href='profileURL' class='avatar' :style='style' target='_blank'></a>
</template>

<script>
import {getAvatarURL, getProfileURL} from '../lib/f-list'

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
    },
    profileURL () {
      return getProfileURL(this.name)
    }
  }
}
</script>

<style lang='stylus' scoped>
.avatar
  display: block
  filter: drop-shadow(0px 2px 4px rgba(black, 0.5))
</style>
