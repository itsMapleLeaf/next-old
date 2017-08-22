<template>
  <context-menu v-bind="$attrs">
    <context-menu-item>
      <icon>message</icon> Send Message
    </context-menu-item>
    <context-menu-item>
      <icon>link-variant</icon> View Profile
    </context-menu-item>
    <context-menu-item>
      <icon>heart</icon> Add Friend
    </context-menu-item>
    <context-menu-item>
      <icon>minus-circle</icon> Ignore
    </context-menu-item>
  </context-menu>
</template>

<script>
import ContextMenu from './ContextMenu'
import ContextMenuItem from './ContextMenuItem'

export default {
  components: {
    ContextMenu,
    ContextMenuItem,
  }
}
</script>
