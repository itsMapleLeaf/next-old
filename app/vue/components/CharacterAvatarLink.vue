<template>
  <a class="ui-link" :href="profileURL" target="_blank" :title="character">
    <img v-show="imageLoaded" transition="fade" :src="avatarURL" @load="imageLoaded = true" />
  </a>
</template>

<style lang="stylus" scoped>
a
  width: 100px
  height: 100px

i
  opacity: 0.5

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
