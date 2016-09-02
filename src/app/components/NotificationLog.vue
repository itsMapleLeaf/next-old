<template lang="pug">
side-menu(right)
  a(href='#', v-for="note in notes").ui-padding-4.ui-block.color-dark
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
