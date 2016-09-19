<template>
  <transition name='overlay-slide-right' appear>
    <div class='overlay-shade' @click.self="$emit('closed')">
      <div class='overlay-panel'>
        <form class='info'>
          <fieldset>
            <h3>
              <ProfileLink :name='character.name'></ProfileLink>
            </h3>
            <small :class="'character-gender-' + character.gender.toLowerCase()">
              {{ character.gender }}
            </small>
          </fieldset>
          <fieldset>
            <ProfileLink :name='character.name'>
              <Avatar :name='character.name'></Avatar>
            </ProfileLink>
          </fieldset>
          <fieldset>
            <div class='status'>
              <Status :status='character.status' :statusmsg='character.statusmsg'></Status>
            </div>
          </fieldset>
          <fieldset v-for='friend in friends[character.name] || []'>
            <ProfileLink :name='friend'>
              <div class='friend'>
                <i class='mdi mdi-heart'></i>
                {{ friend }}
              </div>
            </ProfileLink>
          </fieldset>
        </form>
        <nav>
          <a href='#' v-for='opt in menuOptions' @click='opt.action && opt.action()'>
            <i :class="'mdi mdi-' + opt.icon"></i> {{ opt.label }}
          </a>
        </nav>
      </div>
    </div>
  </transition>
</template>

<script>
import Avatar from './Avatar.vue'
import Status from './Status.vue'
import ProfileLink from './ProfileLink.vue'
import {getters} from '../store'

export default {
  props: {
    character: Object
  },
  components: {
    Avatar,
    Status,
    ProfileLink
  },
  computed: {
    ...getters(['friends']),
    menuOptions () {
      return [
        { label: 'Send Message', icon: 'comment' },
        { label: 'Bookmark', icon: 'bookmark-outline' },
        { label: 'Ignore', icon: 'minus-circle-outline' },
        { label: 'View Profile', icon: 'link-variant' }
      ]
    }
  }
}
</script>

<style lang='stylus' scoped>
@require 'elements/character'
@require 'elements/overlay'
@require 'mixins/layout'
@require 'mixins/theme'
@require 'mixins/highlight'
@require 'transitions/overlay'

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

nav
  a
    display: block
    padding: 0.5em 0.6em
    background: theme-darker(30%)
    +animate()
      background: theme-darker(45%)

  i
    width: 1.2em
</style>
