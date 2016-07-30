<template>
  <div class='flex flex-justify-space-between' :class='highlight'>
    <character :character='character'></character>
    <span v-if='icon'>
      <i :class="'mdi mdi-' + icon"></i>
    </span>
  </div>
</template>

<script>
import Character from './Character.vue'
import CharacterModel from '../models/Character'

export default {
  components: {Character},

  props: {
    character: CharacterModel
  },

  computed: {
    highlight () {
      return this.character.isFriend ? 'highlight-green'
        : this.character.isBookmark ? 'highlight-blue'
        : ''
    },

    icon () {
      return this.character.isFriend ? 'heart'
        : this.character.isBookmark ? 'star'
        : ''
    }
  }
}
</script>
