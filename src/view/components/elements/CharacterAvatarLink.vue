<template>
  <a target="_blank" :href="profileURL">
    <img class="ui transition" v-show="imageLoaded" transition="fade" :src="avatarURL" @load="imageLoaded = true" />
    <i v-show="!imageLoaded" class="fa fa-circle-o-notch fa-spin fa-2x"></i>
  </a>
</template>

<style lang="stylus" scoped>
a
  width: 100px
  height: 100px
  border: none
  text-decoration: none
  display: flex
  justify-content: center
  align-items: center

i
  opacity: 0.5

img:hover
  filter: brightness(1.2)
  opacity: 0.8
</style>

<script>
import {getProfileURL, getAvatarURL} from '../../lib/flist'

export default {
  props: {
    character: Object
  },

  data () {
    return { imageLoaded: false }
  },

  computed: {
    profileURL () {
      return getProfileURL(this.character.name)
    },

    avatarURL () {
      return getAvatarURL(this.character.name)
    }
  }
}
</script>
