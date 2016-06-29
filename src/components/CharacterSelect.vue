<template>
  <div class="ui overlay">
    <div class="ui panel">
      <h1>Who are you?</h1>
      <form class='ui form' @submit.prevent='submit'>
        <div class='ui field'>
          <ul class='ui selection'>
            <li v-for='name in characters'
            :class='{ "active": name === activeCharacter }'
            @click='setSelectedCharacter(name)'>
              {{name}}
            </li>
          </ul>
        </div>
        <div class='ui field'>
          <button class='ui button'>Go</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="stylus" scoped></style>

<script>
import state from '../state'

export default {
  data () {
    return {
      state,
      activeCharacter: state.getUserData().default_character
    }
  },

  computed: {
    characters () {
      return this.state.getUserData().characters.sort()
    }
  },

  methods: {
    setSelectedCharacter (name) {
      this.activeCharacter = name
    },

    submit () {
      this.$emit('character-active', this.activeCharacter)
    }
  }
}
</script>
