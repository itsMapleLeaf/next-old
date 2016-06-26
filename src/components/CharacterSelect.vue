<template>
  <div class="overlay-shade flex-center">
    <div class="overlay-panel text-align-center">
      <form @submit.prevent='submit'>
        <h1>Who are you?</h1>
        <ul class='selection-list'>
          <li v-for='name in characters'
          :class='{ "selected": name === selectedCharacter }'
          @click='setSelectedCharacter(name)'>
            {{name}}
          </li>
        </ul>
        <br />
        <button>Go</button>
      </form>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@import '../styles/components'
@import '../styles/layout'
</style>

<script>
import state from '../state'

export default {
  data () {
    return {
      state,
      selectedCharacter: state.getUserData().default_character
    }
  },

  computed: {
    characters () {
      return this.state.getUserData().characters.sort()
    }
  },

  methods: {
    setSelectedCharacter (name) {
      this.selectedCharacter = name
    },

    submit () {
      this.$emit('character-selected', this.selectedCharacter)
    }
  }
}
</script>
