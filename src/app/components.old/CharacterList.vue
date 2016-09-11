<template lang="pug">
div
  character-list-item.ui-padding-1(v-for='char in users', :key='char.name', :character='char', :is-op='oplist.includes(char.name)')
</template>

<script>
import CharacterListItem from './CharacterListItem.vue'

export default {
  components: {CharacterListItem},
  props: {
    users: Array,
    oplist: Array
  }
}
</script>
