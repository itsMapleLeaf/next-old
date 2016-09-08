<template lang="pug">
mixin avatar
  avatar(:name='state.identity')

mixin characters
  .color-dark
    selection-option(v-for="char in state.characters", :active="char === current", @input="current = char")
      | {{ char }}

mixin confirm
  button.ui-button(action='submit') Go

.ui-overlay
  form.ui-panel.ui-height-11.flex-column.res.res-desktop.res-mobile-portrait(@submit.prevent='submit')
    .ui-field.flex-fixed.ui-text-center
      +avatar
    .ui-field.flex-grow.ui-scroll-y.ui-block-center.ui-width-8.ui-fit-width.ui-text-center
      +characters
    .ui-field.flex-fixed.ui-text-center
      +confirm
    back-button(@click.native='back')

  form.ui-panel.ui-text-center.flex.res.res-mobile-landscape(@submit.prevent='submit')
    .flex-grow.ui-scroll-y.ui-width-7.ui-fit-height.ui-margin-left-2.ui-margin-right-2
      +characters
    .flex-fixed.flex-column.flex-center.ui-margin-right-2
      .ui-field.flex-fixed
        +avatar
      .ui-field.flex-fixed.flex-column.flex-align-center
        +confirm
    back-button(@click.native='back', align='middle')
</template>

<script>
import Avatar from './CharacterAvatarLink.vue'
import SelectionOption from './SelectionOption.vue'
import BackButton from './BackButton.vue'
import * as store from '../store'
import * as session from '../session'

export default {
  components: {Avatar, SelectionOption, BackButton},

  data () {
    return {
      current: '',
      state: store.state
    }
  },

  created () {
    this.current = session.getStorageItem('character') || this.state.characters[0]
  },

  methods: {
    submit () {
      store.popOverlay()
      store.connectToChatServer()
    },

    back () {
      store.popOverlay()
      store.pushOverlay('login')
    }
  },

  watch: {
    'current' (name) {
      session.setStorageItem('character', name)
      store.setIdentity(name)
    }
  }
}
</script>
