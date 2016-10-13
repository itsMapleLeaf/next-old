<template>
  <ProfileLink class='character' :name='name'>
    <span :class='statusClass' v-if='status'>●</span>
    <span :class='genderClass'>{{ name }}</span>
  </ProfileLink>
</template>

<script>
import ProfileLink from './ProfileLink.vue'

export default {
  components: {
    ProfileLink
  },
  props: {
    name: { type: String, required: true },
    gender: { type: String, default: 'none' },
    status: String,
  },
  computed: {
    statusClass() {
      return 'character-status-' + this.status.toLowerCase()
    },
    genderClass() {
      return 'character-gender-' + this.gender.toLowerCase()
    },
  },
}
</script>

<style lang='stylus' scoped>
@require 'vars'

.character
  font-weight: bold

.ignored
  opacity: 0.5
</style>
