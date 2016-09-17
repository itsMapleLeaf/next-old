<template>
  <transition name='overlay-slide-right' appear>
    <div class='overlay-shade' @click.self="$emit('closed')">
      <form class='overlay-panel'>
        <fieldset>
          <h3>{{ character.name }}</h3>
          <small :class="'character-gender-' + character.gender.toLowerCase()">
            {{ character.gender }}
          </small>
        </fieldset>
        <fieldset>
          <Avatar class='character-menu-avatar' :name='character.name'></Avatar>
        </fieldset>
        <fieldset>
          <div class='character-menu-status'>
            <Status :status='character.status' :statusmsg='character.statusmsg'></Status>
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
  </transition>
</template>

<script>
import Avatar from './Avatar.vue'
import Status from './Status.vue'
import {getters} from '../store'

export default {
  props: {
    character: Object
  },
  components: {
    Avatar,
    Status
  },
  computed: {
    ...getters(['friends'])
  }
}
</script>

<style lang='stylus' scoped>
@require '../styles/mixins'
@require '../styles/colors'

.overlay-panel
  anchor(top right bottom)
  position: fixed
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
