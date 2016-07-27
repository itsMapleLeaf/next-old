<template>
  <form @submit.prevent='submit'>
    <div class='ui-fit-width ui-field'>
      <dropdown :items='statusList' v-model='store.status'></dropdown>
    </div>
    <div class='ui-input-icon-right ui-fit-width ui-field'>
      <i class='ui-icon mdi mdi-pencil'></i>
      <textarea placeholder='Status...'  v-model='store.statusmsg'></textarea>
    </div>
    <div class='ui-field'>
      <button class='ui-button ui-small' action='submit' :disabled='disabled'>Update</button>
    </div>
  </form>
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
