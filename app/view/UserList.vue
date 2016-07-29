<template>
  <div>
    <character-list-item v-for='char in users' :character='char' class="ui-padding-1"
      @click.native='openCharacterMenu(char)'>
    </character-list-item>
  </div>
</template>

<script>
import CharacterListItem from './CharacterListItem.vue'
import store from '../store'

export default {
  components: {CharacterListItem},

  props: {
    users: Array
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
