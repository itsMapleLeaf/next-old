<template>
  <div class='overlay-shade' @click.self="$emit('closed')">
    <form class='overlay-panel'>
      <fieldset>
        <h3>{{ character.name }}</h3>
        <small>{{ character.gender }}</small>
      </fieldset>
      <fieldset>
        <Avatar class='character-menu-avatar' :name='character.name'></Avatar>
      </fieldset>
      <fieldset>
        <div class='character-menu-status'>
          <span>{{ character.status }}</span>
          <span v-if='parsedStatus' v-html="' - ' + parsedStatus"></span>
        </div>
      </fieldset>
      <fieldset v-for='friend in friends[character.name] || []'>
        <div class='character-menu-friend'>
          <i class='mdi mdi-heart'></i>
          {{ friend }}
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
import {getters} from '../store'
import {parse} from '../lib/bbc'

export default {
  props: {
    character: Object
  },
  components: {
    Avatar
  },
  computed: {
    ...getters(['friends']),

    parsedStatus () {
      const {statusmsg} = this.character
      return statusmsg ? parse(statusmsg) : ''
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '../styles/mixins'
@import '../styles/colors'

.overlay-panel
  anchor(top right bottom)
  width: 12em
  padding: 0.75em 1em

.character-menu-status
  background: darken($theme-color, 20%)
  font-size: 80%
  font-style: italic
  padding: 0.3rem 0.6rem

.character-menu-friend
  font-size: 80%
  font-style: italic
  padding: 0.3em 0.6em
  highlight($green)

  i
    opacity: 0.7
</style>
