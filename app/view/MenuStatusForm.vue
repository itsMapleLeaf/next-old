<template lang='jade'>
form(@submit.prevent='submit')
  .ui-fit-width.ui-field
    dropdown(:items='statusList', v-model='store.status')
  .ui-input-icon-right.ui-fit-width.ui-field
    textarea(placeholder='Status...', v-model='store.statusmsg')
    i.ui-icon.mdi.mdi-pencil
  .ui-field
    button.ui-button.ui-small(action='submit', :disabled='disabled') Update
</template>

<script>
import Dropdown from './Dropdown.vue'
import store from '../store'
import socket from '../socket'

export default {
  components: {Dropdown},

  data () {
    return {
      statusList: [
        { label: 'Online', value: 'online' },
        { label: 'Looking', value: 'looking' },
        { label: 'Busy', value: 'busy' },
        { label: 'Away', value: 'away' },
        { label: 'DND', value: 'dnd' }
      ],
      disabled: false,
      store
    }
  },

  methods: {
    submit () {
      if (this.disabled) return
      socket.updateStatus(store.status, store.statusmsg)
      this.disabled = true
      window.setTimeout(() => { this.disabled = false }, 1500)
    }
  }
}
</script>
