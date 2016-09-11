<template lang="pug">
side-menu(right, panel-class='flex-column, ui-width-7')
  .flex-fixed.flex-row.flex-justify-space-between.flex-align-center
    .ui-padding-3
      h2 Notifications
    .ui-padding-3
      a(href='#', @click="popOverlay")
        i.mdi.mdi-close
  .flex-grow.color-dark.ui-scroll-y.ui-break-word
    a(href='#', v-for="note in notes").ui-padding-3.ui-block
      i.mdi.mdi-information.ui-faded
      span {{ note.text }}
</template>

<script>
import SideMenu from './SideMenu.vue'
import {state, popOverlay} from '../store.new'

export default {
  components: {SideMenu},
  methods: {
    popOverlay
  },
  computed: {
    notes () {
      return state.messageLog.reverse()
    }
  }
}
</script>
