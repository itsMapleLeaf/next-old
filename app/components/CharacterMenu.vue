<template>
  <div class='overlay-shade' @click.self="$emit('closed')">
    <div class='overlay-panel overlay-slide-right'>
      <form class='info'>
        <fieldset>
          <h3>
            <ProfileLink :name='name'></ProfileLink>
          </h3>
          <small :class="'character-gender-' + gender.toLowerCase()">
            {{ gender }}
          </small>
        </fieldset>
        <fieldset>
          <ProfileLink :name='name'>
            <Avatar :name='name' shadow></Avatar>
          </ProfileLink>
        </fieldset>
        <fieldset>
          <div class='status'>
            <Status :status='status' :statusmsg='statusmsg'></Status>
          </div>
        </fieldset>
        <fieldset v-for='friend in friends[name] || []'>
          <ProfileLink :name='friend'>
            <div class='friend'>
              <i class='mdi mdi-heart'></i>
              {{ friend }}
            </div>
          </ProfileLink>
        </fieldset>
      </form>
      <nav class='options'>
        <a href='#' @click='openPrivateChat'>
          <i class='mdi mdi-comment'></i> Send Message
        </a>
      </nav>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
import Status from './Status.vue'
import ProfileLink from './ProfileLink.vue'
import {store, getters} from '../store'

export default {
  components: {
    Avatar,
    Status,
    ProfileLink,
  },
  computed: {
    ...getters({
      friends: 'friends',
      character: 'characterMenuFocus',
    }),
    name() { return this.character.name },
    gender() { return this.character.gender },
    status() { return this.character.status },
    statusmsg() { return this.character.statusmsg },
    isBookmark() { return store.isBookmark(this.name) },
    isIgnored() { return store.isIgnored(this.name) },
  },
  methods: {
    openPrivateChat() {
      this.$emit('private-chat-opened', this.character.name)
      this.$emit('closed')
    },
    toggleBookmark() {
      if (this.isBookmark) {
        store.removeBookmark(this.name)
      } else {
        store.addBookmark(this.name)
      }
    },
  },
}
</script>

<style lang='stylus' scoped>
@require 'vars'

.overlay-panel
  background: theme-darker(20%)
  anchor(top right bottom)
  position: fixed
  width: 12em

.info
  background: $theme-color
  padding: 0.75em 1em 0.1em

.status
  background: theme-darker(20%)
  font-size: 80%
  font-style: italic
  padding: 0.3rem 0.6rem

.friend
  font-size: 80%
  font-style: italic
  padding: 0.3em 0.6em
  highlight($green)

  i
    opacity: 0.7

.options
  a
    display: block
    padding: 0.5em 0.6em
    background: theme-darker(30%)
    transition: 0.2s

    &:hover
      background: theme-darker(45%)

  i
    width: 1.2em
</style>
