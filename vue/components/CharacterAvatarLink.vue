<template>
  <a :href="profileURL" target="_blank" :title="character">
    <img v-show="imageLoaded" transition="fade" :src="avatarURL" @load="imageLoaded = true" />
  </a>
</template>

<style lang="stylus" scoped>
a
  display: inline-block
  width: 100px
  height: 100px

img
  filter: drop-shadow(0px 2px 3px rgba(black, 0.4))

img:hover
  opacity: 0.7
</style>

<script>
import {getProfileURL, getAvatarURL} from '../modules/flist'

export default {
  props: {
    character: String
  },

  data () {
    return { imageLoaded: false }
  },

  computed: {
    profileURL () {
      return getProfileURL(this.character)
    },

    avatarURL () {
      return getAvatarURL(this.character)
    }
  }
}
</script>
