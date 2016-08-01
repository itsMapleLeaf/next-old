<template>
  <div>
    <character-list-item class='ui-padding-1' v-for='char in users'
      :character='char' :is-op="ops.includes(char.name)">
    </character-list-item>
  </div>
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
