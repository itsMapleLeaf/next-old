<template lang="pug">
side-menu(right, panel-class='flex-column')
  .flex-fixed.ui-padding-3
    h1 Notifications
  .flex-grow.color-dark
    a(href='#', v-for="note in notes").ui-padding-4.ui-block
      i.mdi.mdi-information.ui-faded
      |  {{ note.text }}
</template>

<script>
import SideMenu from './SideMenu.vue'
import {state} from '../store'

export default {
  components: {SideMenu},
  computed: {
    notes () {
      return state.messageLog
    }
  }
}
</script>
