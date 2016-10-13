<template>
  <Overlay @closed="$emit('closed')">
    <div class='content-container'>
      <div class='greeting'>
        <h3>{{ greeting }}</h3>
        <span class='greeting-subtext'>Up for some play?</span>
      </div>
      <div class='flex-row'>
        <div class='flex-fixed avatar-container'>
          <ProfileLink :name='identity'>
            <Avatar :name='identity' shadow></Avatar>
          </ProfileLink>
        </div>
        <form class='flex-fixed form-container' @submit.prevent='submit'>
          <fieldset>
            <Dropdown :options='statusOptions' v-model='status'></Dropdown>
          </fieldset>
          <fieldset>
            <BBCEditor class='status-message'>
              <textarea class='form-textarea' v-model='statusmsg'></textarea>
            </BBCEditor>
          </fieldset>
          <fieldset>
            <button class='form-button'>Update</button>
          </fieldset>
        </form>
      </div>
    </div>
  </Overlay>
</template>

<style lang='stylus' scoped>
@require 'vars'

$spacing = 1em

.greeting
  text-align: center

.greeting-subtext
  font-size: 80%
  opacity: 0.5

.content-container
  margin: $spacing $spacing 0

.avatar-container
  margin-top: $spacing
  margin-right: $spacing

.form-container
  margin-top: $spacing

.status-message
  width: 12em !important
  height: 5em !important
</style>

<script>
import Overlay from './Overlay.vue'
import Avatar from './Avatar.vue'
import ProfileLink from './ProfileLink.vue'
import Dropdown from './Dropdown.vue'
import BBCEditor from './BBCEditor.vue'
import {store, getters} from '../store'

export default {
  components: {
    Overlay,
    Avatar,
    Dropdown,
    ProfileLink,
    BBCEditor,
  },
  data() {
    return {
      status: 'online',
      statusmsg: '',
    }
  },
  created() {
    const char = this.onlineCharacters[this.identity]
    this.status = char.status
    this.statusmsg = char.statusmsg
  },
  computed: {
    ...getters(['onlineCharacters', 'identity']),
    statusOptions() {
      return [
        { value: 'online', label: 'Online' },
        { value: 'looking', label: 'Looking' },
        { value: 'busy', label: 'Busy' },
        { value: 'away', label: 'Away' },
        { value: 'dnd', label: 'DND' },
      ]
    },
    greeting() {
      return `Hi, ${this.identity.split(' ')[0]}!`
    },
  },
  methods: {
    submit() {
      store.updateStatus(this.status, this.statusmsg)
    },
  },
}
</script>
