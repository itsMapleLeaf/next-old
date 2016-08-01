<template lang='jade'>
div
  character-list-item.ui-padding-1(v-for='char in users', :character='char', :is-op='ops.includes(char.name)')
</template>

<script>
import CharacterListItem from './CharacterListItem.vue'

export default {
  components: {CharacterListItem},

  props: {
    users: Array,
    ops: Array
  }
}
</script>
