<template>
  <div class="shade box center">
    <div class="panel">
      <form @submit.prevent='submit'>
        <h1>Who are you?</h1>
        <ul class='selection-list'>
          <li v-for='name in characters'
          :class='{ "selected": name === selectedCharacter }'
          @click='setSelectedCharacter(name)'>
            {{name}}
          </li>
        </ul>
        <button>Go</button>
      </form>
    </div>
  </div>
</template>

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

<style lang="stylus" scoped>
.panel
  text-align: center
</style>
