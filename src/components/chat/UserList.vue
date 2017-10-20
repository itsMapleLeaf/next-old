<template>
  <div>
    <div v-for="char in sortedUsers" :key="char.name">
      <div :class="getHighlight(char)" style="padding: 0.2rem 0.3rem">
        <character-name :name="char.name"></character-name>
      </div>
    </div>
  </div>
</template>

<script>
import sortBy from 'lodash/sortBy'
import store from '@/store'

export default {
  props: {
    users: Array,
    ops: Array,
  },
  components: {
    CharacterName: require('./CharacterName.vue').default,
  },
  computed: {
    userCharacters() {
      return this.users.map(name => store.chat.characters.getCharacter(name))
    },
    sortedUsers() {
      const { chat } = store
      return sortBy(
        this.userCharacters,
        char => {
          if (chat.admins[char.name]) return 0
          if (this.ops.includes(char.name)) return 1
          if (chat.friends[char.name]) return 2
          if (char.status === 'looking') return 3
          return 4
        },
        char => char.name.toLowerCase(),
      )
    },
  },
  methods: {
    getHighlight(char) {
      const { chat } = store
      if (chat.friends[char.name]) return 'highlight-green'
      if (chat.admins[char.name]) return 'highlight-red'
      if (this.ops.includes(char.name)) return 'highlight-yellow'
      return ''
    },
  },
}
</script>
