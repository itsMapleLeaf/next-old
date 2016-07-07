<template>
  <overlay no-close>
    <h2>Who do we feel like playing today?</h2>
    <form @submit.prevent='submit'>
      <fieldset>
        <ul class='ui-selection'>
          <li v-for='name in characters'
          :class='{ "active": name === activeCharacter }'
          @click='setSelectedCharacter(name)'>
            {{name}}
          </li>
        </ul>
      </fieldset>
      <fieldset>
        <button class='ui padded-button'>Go</button>
      </fieldset>
    </form>
  </overlay>
</template>

<style lang="stylus" scoped></style>

<script>
import Overlay from '../elements/Overlay.vue'
import {store} from 'modules/store'

export default {
  data () {
    return {
      activeCharacter: '',
      state: store.state
    }
  },

  components: {
    Overlay
  },

  computed: {
    characters () {
      return store.getUserCharacters().sort()
    }
  },

  methods: {
    setSelectedCharacter (name) {
      this.activeCharacter = name
    },

    submit () {
      store.notify('UserCharacterSelected', { name: this.activeCharacter })
    }
  }
}
</script>
