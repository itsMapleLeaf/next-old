<template lang="pug">
form(@submit.prevent='submit')
  .ui-fit-width.ui-field
    dropdown(:items='statusList', v-model='status')
  .ui-input-icon-right.ui-fit-width.ui-field
    textarea(placeholder='Status...', v-model='statusmsg')
    i.ui-icon.mdi.mdi-pencil
  .ui-field
    button.ui-button.ui-small(action='submit', :disabled='disabled') Update
</template>

<script>
import Dropdown from './Dropdown.vue'
import * as store from '../store.new'

export default {
  components: {Dropdown},

  data () {
    return {
      status: 'online',
      statusmsg: '',
      statusList: [
        { label: 'Online', value: 'online' },
        { label: 'Looking', value: 'looking' },
        { label: 'Busy', value: 'busy' },
        { label: 'Away', value: 'away' },
        { label: 'DND', value: 'dnd' }
      ],
      disabled: false
    }
  },

  created () {
    this.status = store.state.status
    this.statusmsg = store.state.statusmsg
  },

  methods: {
    submit () {
      if (this.disabled) return
      store.updateStatus(this.status, this.statusmsg)
      this.disabled = true
      window.setTimeout(() => { this.disabled = false }, 1500)
    }
  }
}
</script>
