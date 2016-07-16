<template>
  <overlay no-close>
    <h2>Who do we feel like playing today?</h2>
    <form @submit.prevent='submit'>
      <div class='ui-field'>
        <div class='ui-select'>
          <a href='#' v-for='name in characters'
            :class="name === activeCharacter ? 'ui-select-active' : ''"
            @click.prevent='setSelectedCharacter(name)'>
            {{name}}
          </a>
        </div>
      </div>
      <div class='ui-field'>
        <button class='ui-button'>Go</button>
      </div>
    </form>
  </overlay>
</template>

<style lang="stylus" scoped></style>

<script>
import Overlay from '../elements/Overlay.vue'
import socket from 'modules/socket'
import {saveStorageKeys} from 'modules/storage'
import {pushOverlay, popOverlay} from '../../vuex/actions'

export default {
  data () {
    return {
      activeCharacter: ''
    }
  },

  components: {Overlay},

  vuex: {
    getters: {
      characters: state => state.user.characterList
    },
    actions: {
      pushOverlay,
      popOverlay,
      setUserCharacter (store, name) { store.dispatch('SetUserCharacter', name) }
    }
  },

  methods: {
    setSelectedCharacter (name) {
      this.activeCharacter = name
    },

    submit () {
      this.setUserCharacter(this.activeCharacter)
      saveStorageKeys({ character: this.activeCharacter })
      this.popOverlay()
      socket.connect()
    }
  }
}
</script>
