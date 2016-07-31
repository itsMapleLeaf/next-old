<template>
  <span>
    <i v-if='isChannelRoom' :class="'mdi mdi-' + icon"></i>
    <img v-else :src='avatar' style='height: 1em; width: auto'>
    <span v-html='room.name || room.partner.name'></span>
  </span>
</template>

<script>
import ChannelRoom from '../models/ChannelRoom'
import PrivateRoom from '../models/PrivateRoom'
import {getAvatarURL} from '../f-list'

export default {
  props: {
    room: Object
  },

  computed: {
    icon () {
      if (this.isChannelRoom) {
        return this.room.id === this.room.name ? 'earth' : 'key-variant'
      }
      return ''
    },

    avatar () {
      if (this.isPrivateRoom) {
        return getAvatarURL(this.room.partner.name)
      }
    },

    isChannelRoom () {
      return this.room instanceof ChannelRoom
    },

    isPrivateRoom () {
      return this.room instanceof PrivateRoom
    }
  }
}
</script>
