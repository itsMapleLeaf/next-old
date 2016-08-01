<template lang='jade'>
section
  header.ui-margin-bottom-1
    h2
      slot(name='header')
    small
      slot(name='subtext')
  span.ui-margin-v-1
    avatar(:name='character')
</template>

<script>
import Avatar from './CharacterAvatarLink.vue'

export default {
  components: {Avatar},

  props: {
    character: String
  }
}
</script>
