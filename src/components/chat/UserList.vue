<template>
  <div>
    <div v-for="char in sortedUsers" :key="char.name">
      <div :class="getHighlight(char)" style="padding: 0.2rem 0.3rem">
        <character-name v-bind="char"></character-name>
      </div>
    </div>
  </div>
</template>

<script>
import sortBy from 'lodash/sortBy'

export default {
  props: {
    users: Array,
    ops: Array,
  },
  components: {
    CharacterName: require('./CharacterName.vue').default,
  },
  computed: {
    characters() {
      const { characters } = this.$store.state.chat
      return this.users.map(name => characters[name])
    },
    sortedUsers() {
      const { chat } = this.$store.state
      return sortBy(this.characters,
        char => {
          if (chat.admins[char.name]) return 0
          if (this.ops.includes(char.name)) return 1
          if (chat.friends[char.name]) return 2
          if (char.status === 'looking') return 3
          return 4
        },
        char => char.name.toLowerCase(),
      )
    }
  },
  methods: {
    getHighlight(char) {
      const { chat } = this.$store.state
      if (chat.friends[char.name]) return 'highlight-green'
      if (chat.admins[char.name]) return 'highlight-red'
      if (this.ops.includes(char.name)) return 'highlight-yellow'
      return ''
    }
  }
}
</script>
