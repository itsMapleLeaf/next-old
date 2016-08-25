<template lang="jade">
.ui-overlay(@click.self='popOverlay')
  .ui-panel.ui-scroll-y
    .ui-padding-subtle.ui-text-center
      h2 {{ room.name }}
    .color-dark.ui-padding-square-1.ui-fit-width.ui-pre-wrap(style='width: 40em', v-html='room.description')
    user-list.color-dark.ui-margin-1.ui-width-7.ui-fit-width.ui-block-center.res.res-mobile(:users='room.characters', :ops='room.ops')
    back-button(align='top', @click.native='popOverlay')
</template>

<script>
import UserList from './UserList.vue'
import BackButton from './BackButton.vue'
import * as store from '../store'

export default {
  components: {UserList, BackButton},

  // TODO: use a prop for the room instead of importing store state
  data () {
    return { state: store.state }
  },

  computed: {
    room () { return this.state.currentRoom },
  },

  methods: {
    popOverlay () { store.popOverlay() }
  }
}
</script>
