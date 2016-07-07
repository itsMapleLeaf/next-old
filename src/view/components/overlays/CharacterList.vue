<template>
  <overlay no-close>
    <h2>Who do we feel like playing today?</h2>
    <form @submit.prevent='submit'>
      <fieldset>
        <selection-list>
          <li v-for='name in characters' :active="name === activeCharacter" @click='setSelectedCharacter(name)'>
            {{name}}
          </li>
        </selection-list>
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
import SelectionList from '../elements/SelectionList.vue'
import {store} from 'modules/store'

export default {
  data () {
    return {
      activeCharacter: '',
      state: store.state
    }
  },

  components: { Overlay, SelectionList },

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
