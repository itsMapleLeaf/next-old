<template lang="jade">
.ui-overlay
  form.ui-panel.ui-height-11.flex-column.res.res-desktop.res-mobile-portrait(@submit.prevent='submit')
    .ui-field.flex-fixed.ui-text-center
      avatar(:name='state.identity')
    .ui-field.flex-grow.ui-scroll-y.ui-block-center.ui-width-8.ui-fit-width.ui-text-center
      selection-list(:items='state.characters', v-model='current')
    .ui-field.flex-fixed.ui-text-center
      button.ui-button(action='submit') Go
    back-button(@click.native='back')
  form.ui-panel.ui-text-center.flex.res.res-mobile-landscape(@submit.prevent='submit')
    .flex-grow.ui-scroll-y.ui-width-7.ui-fit-height.ui-margin-left-2.ui-margin-right-2
      selection-list(:items='state.characters', v-model='current')
    .flex-fixed.flex-column.flex-center.ui-margin-right-2
      .ui-field.flex-fixed
        avatar(:name='state.identity')
      .ui-field.flex-fixed.flex-column.flex-align-center
        button.ui-button(action='submit') Go
    back-button(@click.native='back', align='middle')
</template>

<script>
import Avatar from './CharacterAvatarLink.vue'
import SelectionList from './SelectionList.vue'
import BackButton from './BackButton.vue'
import {store, state} from '../store'
import session from '../session'

export default {
  components: {Avatar, SelectionList, BackButton},

  data () {
    return {
      current: '',
      state
    }
  },

  mounted () {
    const data = session.load()
    if (data && data.character) {
      this.current = data.character
    } else {
      this.current = this.state.characters[0]
    }
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
      session.data.character = name
      session.save()
      store.setIdentity(name)
    }
  }
}
</script>
