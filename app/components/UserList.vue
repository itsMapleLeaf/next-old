<template>
  <div class='flex-column'>
    <div class='user-list-count flex-fixed'>Users: {{ users.length }}</div>
    <div class='user-list flex-grow'>
      <div class='user-list-user' :class='getHighlight(user)' v-for='user in sortedUsers'>
        <span class='user-list-user-icon'>
          <i :class="'mdi mdi-' + getIcon(user)"></i>
        </span>
        <Character v-bind='user' />
      </div>
    </div>
  </div>
</template>

<style lang='stylus' scoped>
@require 'vars'

.user-list
  overflow-y: auto

.user-list-friend
  highlight($green)

.user-list-bookmark
  highlight($blue)

.user-list-admin
  highlight($red)

.user-list-op
  highlight($yellow)

.user-list-count
  background: darken($theme-color, 20%)
  padding: 0.3em 0.6em

.user-list-user
  padding: 0.15em 0.3em 0.15em

.user-list-user-icon
  opacity: 0.8
  float: right
</style>

<script>
import Character from './Character.vue'
import {store} from '../store'

export default {
  props: {
    users: Array,
    ops: Array,
  },
  components: {
    Character,
  },
  methods: {
    getSortWeight(char) {
      const {name, status} = char

      return store.isFriend(name) ? 0 :
        store.isBookmark(name) ? 1 :
        store.isAdmin(name) ? 2 :
        this.ops.includes(name) ? 3 :
        status === 'looking' ? 4 : 5
    },
    getHighlight({ name }) {
      return store.isFriend(name) ? 'user-list-friend' :
        store.isBookmark(name) ? 'user-list-bookmark' :
        store.isAdmin(name) ? 'user-list-admin' :
        this.ops.includes(name) ? 'user-list-op' : ''
    },
    getIcon({ name }) {
      return store.isFriend(name) ? 'heart' :
        store.isBookmark(name) ? 'star' : ''
    },
  },
  computed: {
    sortedUsers() {
      return this.users.slice()
        .sort((a, b) => {
          const diff = this.getSortWeight(a) - this.getSortWeight(b)
          return diff !== 0 ? diff : a.name.localeCompare(b.name)
        })
    },
  },
}
</script>
