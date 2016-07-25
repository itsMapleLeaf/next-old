<template>
  <div class='ui-overlay'>
    <div class='ui-panel ui-text-center'>
      <form @submit.prevent='submit'>
        <div class='ui-margin-1'>
          <avatar :name='store.identity'></avatar>
        </div>
        <selection-list
          class='ui-width-6 ui-height-8'
          :items='store.characters'
          v-model='current'>
        </selection-list>
        <div class='ui-margin-1'>
          <button class='ui-button'>Go</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Avatar from './CharacterAvatarLink.vue'
import SelectionList from './SelectionList.vue'
import store from '../store'
import session from '../session'
import socket from '../socket'

export default {
  components: {Avatar, SelectionList},

  data () {
    return {
      current: '',
      store
    }
  },

  mounted () {
    const data = session.load()
    if (data && data.character) {
      this.current = data.character
    } else {
      this.current = this.store.characters[0]
    }
  },

  methods: {
    submit () {
      this.store.popOverlay()
      socket.connect()
    }
  },

  watch: {
    'current' (name) {
      session.data.character = name
      session.save()
      this.store.setIdentity(name)
    }
  }
}
</script>
