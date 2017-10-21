<template>
  <div class="card bg-color-darken-1 flex-row flex-align-center">
    <div class="card-avatar">
      <img class="card-avatar-image block" :src="getAvatarURL(name)">
    </div>
    <div class="card-name flex-grow">
      <character-name :name="name"></character-name>
    </div>
    <icon class="faded">heart</icon>
  </div>
</template>

<script>
import { getAvatarURL } from '@/api'
import CharacterName from './CharacterName.vue'

export default {
  props: {
    name: String,
  },
  components: {
    CharacterName,
  },
  methods: {
    getAvatarURL,
  },
}
</script>

<style lang="scss" scoped>
.card {
  width: 20rem; // height: 100px;
  padding: 0.2rem;

  align-items: center;

  & > * {
    padding: 0.2rem;
  }
}

.card-avatar-image {
  width: 2em;
  height: 2em;
}
</style>

