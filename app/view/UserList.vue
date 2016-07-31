<template>
  <div>
    <character-list-item class='ui-padding-1' v-for='char in users'
      :character='char' :is-op="ops.includes(char.name)">
    </character-list-item>
  </div>
</template>

<script>
import CharacterListItem from './CharacterListItem.vue'
import store from '../store'

export default {
  components: {CharacterListItem},

  props: {
    users: Array,
    ops: Array
  },

  data () {
    return { store }
  },

  methods: {
    openCharacterMenu (char) {
      this.store.openCharacterMenu(char.name)
    }
  }
}
</script>
