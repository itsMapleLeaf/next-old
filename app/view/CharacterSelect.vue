<template>
  <div class='ui-overlay'>
    <form class='ui-panel ui-text-center ui-height-11 ui-fit-viewport flex-column res res-desktop res-mobile-portrait' @submit.prevent='submit'>
      <div class='ui-field flex-fixed'>
        <avatar :name='store.identity'></avatar>
      </div>
      <div class='ui-field flex-grow ui-scroll-y ui-block-center ui-width-8 ui-fit-width'>
        <selection-list
          :items='store.characters'
          v-model='current'>
        </selection-list>
      </div>
      <div class='ui-field flex-fixed'>
        <button class='ui-button' action='submit'>Go</button>
      </div>
    </form>

    <form class='ui-panel ui-text-center ui-fit-viewport flex res res-mobile-landscape' @submit.prevent='submit'>
      <div class='flex-grow ui-scroll-y ui-width-7 ui-fit-height ui-margin-left-1 ui-margin-right-1'>
        <selection-list
          :items='store.characters'
          v-model='current'>
        </selection-list>
      </div>
      <div class='flex-fixed flex-column flex-center ui-margin-right-1'>
        <div class='ui-field flex-fixed'>
          <avatar :name='store.identity'></avatar>
        </div>
        <div class='ui-field flex-fixed'>
          <button class='ui-button' action='submit'>Go</button>
        </div>
      </div>
    </form>
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
