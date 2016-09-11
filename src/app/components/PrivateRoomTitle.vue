<template lang="pug">
span
  img(:src='avatarURL', style='height: 1em; position: relative; top: 0.1em')
  span.ui-label {{ room.partner.name }}
</template>

<script>
import {getAvatarURL} from '../f-list'

export default {
  props: {
    room: Object
  },
  computed: {
    avatarURL () { return getAvatarURL(this.room.partner.name) }
  }
}
</script>
