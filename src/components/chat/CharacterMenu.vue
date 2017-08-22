<template>
  <context-menu v-bind="{ x, y }">
    <context-menu-item @click.prevent.native="sendMessage">
      <icon>message</icon> Send Message
    </context-menu-item>
    <context-menu-item :href="getProfileURL(character)" target="_blank">
      <icon>link-variant</icon> View Profile
    </context-menu-item>
    <context-menu-item>
      <icon>minus-circle</icon> Ignore (not working)
    </context-menu-item>
  </context-menu>
</template>

<script>
import ContextMenu from './ContextMenu'
import ContextMenuItem from './ContextMenuItem'
import { getProfileURL } from '../../api'

export default {
  props: {
    x: Number,
    y: Number,
    character: String,
  },
  components: {
    ContextMenu,
    ContextMenuItem,
  },
  methods: {
    getProfileURL,
    sendMessage() {
      this.$emit('sendmessage', this.character)
    }
  }
}
</script>
