<template>
  <div class="ui overlay" transition="fade">
    <div class="ui panel">
      <h2>Who do we feel like playing today?</h2>
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
import state from '../../lib/state'
import {CharacterSelected} from '../../lib/events'

export default {
  data () {
    return {
      state,
      activeCharacter: state.getCharacter()
    }
  },

  computed: {
    characters () {
      return this.state.getUserCharacterList().sort()
    }
  },

  methods: {
    setSelectedCharacter (name) {
      this.activeCharacter = name
    },

    submit () {
      this.$dispatch(CharacterSelected, this.activeCharacter)
    }
  }
}
</script>
