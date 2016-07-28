<template>
  <div class='ui-overlay' @click.self='store.popOverlay'>
    <div class='ui-panel ui-fit-viewport ui-scroll-y'>
      <div class='ui-padding-subtle ui-text-center'>
        <h2>{{ title }}</h2>
      </div>
      <div
        class='color-dark ui-padding-square-1 ui-fit-width ui-pre-wrap'
        style='width: 40em' v-html='description'>
      </div>
      <user-list
        class='
          color-dark
          ui-margin-1 ui-width-7 ui-fit-width ui-block-center
          res res-mobile'
        :users='users'>
      </user-list>
      <back-button align='top' @click.native='store.popOverlay'></back-button>
    </div>
  </div>
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
