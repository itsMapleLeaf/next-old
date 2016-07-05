<template>
  <overlay no-close>
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
        <button class='ui padded-button'>Go</button>
      </div>
    </form>
  </overlay>
</template>

<style lang="stylus" scoped></style>

<script>
import Overlay from 'view/components/elements/Overlay.vue'
import {store} from 'modules/store'

export default {
  data () {
    return {
      activeCharacter: '',
      store
    }
  },

  components: {
    Overlay
  },

  computed: {
    characters () {
      return this.store.getUserCharacters().sort()
    }
  },

  methods: {
    setSelectedCharacter (name) {
      this.activeCharacter = name
    },

    submit () {
      this.store.dispatch('UserCharacterSelected', { name: this.activeCharacter })
    }
  }
}
</script>
