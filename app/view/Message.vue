<template>
  <div>
    <character :character='sender' style='margin-right: 0.5rem'></character>
    <span v-html='message'></span>
  </div>
</template>

<script>
import Character from './Character.vue'
import CharacterModel from '../models/Character'

export default {
  components: {Character},
  props: {
    sender: CharacterModel,
    message: String
  }
}
</script>
