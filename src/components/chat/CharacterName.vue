<template>
  <a href='#' class='character' :name='name' :href="profileURL" target="_blank">
    <span :class='statusClass' v-if='status'>•</span>
    <span :class='genderClass'>{{ name }}</span>
  </a>
</template>

<script>
import { getProfileURL } from '../../api'

export default {
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
    profileURL() {
      return getProfileURL(this.name)
    },
  },
}
</script>

<style lang='scss' scoped>
.character {
  font-weight: bold;
}

.ignored {
  opacity: 0.5;
}
</style>
