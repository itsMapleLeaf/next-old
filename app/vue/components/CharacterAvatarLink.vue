<template>
  <a :href="profileURL" target="_blank" :title="character">
    <img class='ui-link' v-show="imageLoaded" transition="fade" :src="avatarURL" @load="imageLoaded = true" />
  </a>
</template>

<style lang="stylus" scoped>
a
  display: inline-block
  width: 100px
  height: 100px

img:hover
  opacity: 0.8
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
