<template lang="pug">
side-menu(left, panel-class='ui-scroll-y')
  user-menu-content
</template>

<script>
import SideMenu from './SideMenu.vue'
import UserMenuContent from './UserMenuContent.vue'

export default {
  components: {UserMenuContent, SideMenu}
}
</script>
