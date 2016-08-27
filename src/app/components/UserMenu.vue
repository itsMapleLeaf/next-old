<template lang="pug">
side-menu(right)
  user-menu-content(style="height: 100%")
</template>

<script>
import SideMenu from './SideMenu.vue'
import UserMenuContent from './UserMenuContent.vue'

export default {
  components: {UserMenuContent, SideMenu}
}
</script>
