<template>
  <div class='container' @click.self="$emit('closed')">
    <a href='#' class='character' v-for='char in characters' :data-character='char.name'>
      <div class='flex-row'>
        <Avatar :name='char.name' size='6em'></Avatar>
        <div class='user-info flex-column'>
          <div class='name flex-fixed'>
            <h4 :class="'character-gender-' + char.gender.toLowerCase()">
              {{ char.name }}
            </h4>
          </div>
          <div class='status flex-grow'>
            <Status :status='char.status' :statusmsg='char.statusmsg'></Status>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
import Status from './Status.vue'
import {state} from '../store'

export default {
  components: {
    Avatar,
    Status,
  },
  computed: {
    characters() {
      return Object.values(state.onlineCharacters).slice(0, 200)
    },
  },
}
</script>

<style lang='stylus' scoped>
@require 'elements/overlay'
@require 'elements/flex'
@require 'elements/character'
@require 'mixins/flex'
@require 'mixins/layout'
@require 'mixins/theme'

.container
  fullscreen()
  flex-align(center, flex-start)
  background: rgba(black, 0.8)
  flex-wrap: wrap
  overflow-y: auto
  padding: 1em

.character
  background: $theme-color
  margin: 0.8em
  box-sizing: content-box
  accent-border(bottom)

.user-info
  size(10em, 6em)

.name
  padding: 0.3em 0.6em
  background: theme-darker(30%)

.status
  padding: 0.3em 0.6em
  background: theme-darker(20%)
  font-size: 80%
  font-style: italic
  overflow-y: auto
  min-height: 0
</style>
