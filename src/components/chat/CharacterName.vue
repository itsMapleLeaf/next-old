<template>
  <a href='#' class='character' :name='name' :href="profileURL" target="_blank" :data-character="name">
    <span v-if='status' :class='statusClass' :title="status">•</span>
    <span :class='genderClass'>{{ name }}</span>
  </a>
</template>

<script>
import { getProfileURL } from '@/api'
import store from '@/store'

export default {
  props: {
    name: { type: String, required: true },
  },
  computed: {
    character() {
      return store.chat.characters.getCharacter(this.name)
    },
    gender() {
      return this.character.gender
    },
    status() {
      return this.character.status
    },
    genderClass() {
      return 'character-gender-' + this.gender.toLowerCase()
    },
    statusClass() {
      return 'character-status-' + this.status.toLowerCase()
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
