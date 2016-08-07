<template lang="jade">
span
  img(:src='room.partner.avatarURL', style='height: 1em; position: relative; top: 0.1em')
  | {{ room.partner.name }}
</template>

<script>
import PrivateRoom from '../models/PrivateRoom'

export default {
  props: {
    room: PrivateRoom
  }
}
</script>
