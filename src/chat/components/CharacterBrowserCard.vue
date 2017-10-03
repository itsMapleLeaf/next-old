<template>
  <div class="card bg-color-darken-1 flex-row">
    <div class="card-avatar">
      <img class="card-avatar-image block" :src="getAvatarURL(name)">
    </div>
    <div class="card-name flex-grow">
      <character-name v-bind="{ name, gender, status }"></character-name>
    </div>
    <div class="card-icon">
      <icon>heart</icon>
    </div>
  </div>
</template>

<script>
import { getAvatarURL, getProfileURL } from '@/api'
import { parseBBC } from '@/bbc'
import CharacterName from './CharacterName.vue'

export default {
  props: {
    name: String,
    gender: String,
    status: String,
    statusMessage: String,
  },
  components: {
    CharacterName
  },
  methods: {
    getAvatarURL,
    getProfileURL,
    parseBBC
  },
}
</script>

<style lang="scss" scoped>
.card {
  width: 20rem; // height: 100px;
  padding: 0.2rem;

  align-items: center;

  &>* {
    padding: 0.2rem;
  }
}

.card-avatar-image {
  width: 2em;
  height: 2em;
}

.card-icon {
  font-size: 1.5rem;
  opacity: 0.5;
  color: rgb(46, 204, 113);
}
</style>

