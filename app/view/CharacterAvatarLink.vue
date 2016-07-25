<template>
  <a :href="profileURL" target="_blank" :title="name">
    <img v-show="imageLoaded" transition="fade" :src="avatarURL" @load="imageLoaded = true" />
  </a>
</template>

<style lang="stylus" scoped>
a
  display: inline-block
  width: 100px
  height: 100px

img
  -webkit-filter: drop-shadow(0px 2px 3px rgba(black, 0.4))
  filter: drop-shadow(0px 2px 3px rgba(black, 0.4))

img:hover
  opacity: 0.7
</style>

<script>
import {getProfileURL, getAvatarURL} from '../f-list'

export default {
  props: {
    name: String
  },

  data () {
    return { imageLoaded: false }
  },

  computed: {
    profileURL () {
      return getProfileURL(this.name)
    },

    avatarURL () {
      return getAvatarURL(this.name)
    }
  }
}
</script>
