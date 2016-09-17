<template>
  <div>
    <div class='user-list-count'>Users: {{ users.length }}</div>
    <div class='user-list-user' :class='getHighlight(user)' v-for='user in sortedUsers'>
      <span class='user-list-user-icon'>
        <i :class="'mdi mdi-' + getIcon(user)"></i>
      </span>
      <Character :name='user.name' :gender='user.gender' :status='user.status' />
    </div>
  </div>
</template>

<script>
import Character from './Character.vue'
import {store} from '../store'

export default {
  props: {
    users: Array,
    ops: Array
  },
  components: {
    Character
  },
  methods: {
    getSortWeight (char) {
      const {name, status} = char
      switch (true) {
        case store.isFriend(name):
          return 0
        case store.isBookmark(name):
          return 1
        case store.isAdmin(name):
          return 2
        case this.ops.includes(name):
          return 3
        case status === 'looking':
          return 4
        default:
          return 5
      }
    },
    getHighlight (char) {
      const highlights = [
        'highlight-friend',
        'highlight-bookmark',
        'highlight-admin',
        'highlight-op'
      ]
      return highlights[this.getSortWeight(char)]
    },
    getIcon (char) {
      const icons = ['heart', 'star']
      return icons[this.getSortWeight(char)]
    }
  },
  computed: {
    sortedUsers () {
      return this.users.slice()
        .sort((a, b) => {
          const diff = this.getSortWeight(a) - this.getSortWeight(b)
          return diff !== 0 ? diff : a.name.localeCompare(b.name)
        })
    },
  }
}
</script>

<style lang='stylus' scoped>
@require '../styles/colors'

$highlights = {
  friend: $green
  bookmark: $blue
  admin: $red
  op: $yellow
}

for $name, $color in $highlights
  .highlight-{$name}
    background: rgba($color, 0.2)
    color: $color

.user-list-count
  background: darken($theme-color, 20%)
  padding: 0.3em 0.6em

.user-list-user
  padding: 0.15em 0.3em 0.15em

.user-list-user-icon
  opacity: 0.8
  float: right
</style>
