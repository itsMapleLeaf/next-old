<template>
  <ProfileLink class='avatar' :name='name'>
    <div class='avatar-image' :style='style'></div>
  </ProfileLink>
</template>

<script>
import ProfileLink from './ProfileLink.vue'
import {getAvatarURL} from '../lib/f-list'

export default {
  props: {
    name: String,
    size: Number
  },
  components: {
    ProfileLink
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
  filter: drop-shadow(0px 2px 4px rgba(black, 0.5))
  opacity: 1
  transition: 0.2s
  &:hover
    opacity: 0.7
</style>
