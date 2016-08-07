<template lang="jade">
.ui-overlay(@click.self='store.popOverlay')
  .ui-panel.ui-scroll-y
    .ui-padding-subtle.ui-text-center
      h2 {{ title }}
    .color-dark.ui-padding-square-1.ui-fit-width.ui-pre-wrap(style='width: 40em', v-html='description')
    user-list.color-dark.ui-margin-1.ui-width-7.ui-fit-width.ui-block-center.res.res-mobile(:users='users')
    back-button(align='top', @click.native='store.popOverlay')
</template>

<script>
import UserList from './UserList.vue'
import BackButton from './BackButton.vue'
import store from '../store'

export default {
  components: {UserList, BackButton},

  data () {
    return { store }
  },

  computed: {
    title () { return store.getCurrentRoom().name },
    description () { return store.getCurrentRoom().description },
    users () { return store.getCurrentRoom().characters }
  }
}
</script>
