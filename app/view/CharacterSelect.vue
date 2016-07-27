<template>
  <div class='ui-overlay'>
    <form class='ui-panel ui-height-11 ui-fit-viewport flex-column res res-desktop res-mobile-portrait' @submit.prevent='submit'>
      <div class='ui-field flex-fixed ui-text-center'>
        <avatar :name='store.identity'></avatar>
      </div>
      <div class='ui-field flex-grow ui-scroll-y ui-block-center ui-width-8 ui-fit-width ui-text-center'>
        <selection-list :items='store.characters' v-model='current'></selection-list>
      </div>
      <div class='ui-field flex-fixed ui-text-center'>
        <button class='ui-button' action='submit'>Go</button>
      </div>
      <back-button @click.native='back'></back-button>
    </form>

    <form class='ui-panel ui-text-center ui-fit-viewport flex res res-mobile-landscape' @submit.prevent='submit'>
      <div class='flex-grow ui-scroll-y ui-width-7 ui-fit-height ui-margin-left-2 ui-margin-right-2'>
        <selection-list
          :items='store.characters'
          v-model='current'>
        </selection-list>
      </div>
      <div class='flex-fixed flex-column flex-center ui-margin-right-2'>
        <div class='ui-field flex-fixed'>
          <avatar :name='store.identity'></avatar>
        </div>
        <div class='ui-field flex-fixed flex-column flex-align-center'>
          <button class='ui-button' action='submit'>Go</button>
        </div>
      </div>
      <back-button @click.native='back' align='middle'></back-button>
    </form>
  </div>
</template>

<script>
import Avatar from './CharacterAvatarLink.vue'
import SelectionList from './SelectionList.vue'
import BackButton from './BackButton.vue'
import store from '../store'
import session from '../session'
import socket from '../socket'

export default {
  components: {Avatar, SelectionList, BackButton},

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
      this.current = store.characters[0]
    }
  },

  methods: {
    submit () {
      store.popOverlay()
      socket.connect()
    },

    back () {
      store.popOverlay()
      store.pushOverlay('login')
    }
  },

  watch: {
    'current' (name) {
      session.data.character = name
      session.save()
      store.setIdentity(name)
    }
  }
}
</script>
