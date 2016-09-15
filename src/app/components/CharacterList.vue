<template>
  <form class='character-list' @submit.prevent='submit'>
    <fieldset>
      <h2>Select a Character</h2>
    </fieldset>
    <fieldset>
      <div class='character-list-avatar' :style="{ 'background-image': 'url(' + avatarURL + ')' }"></div>
    </fieldset>
    <fieldset>
      <div class='selection-list'>
        <a href='#' v-for='name of characters'
          :class="name === current && 'selection-list-active'"
          @click.prevent='select(name)'
          @focus='select(name)'>
          {{ name }}
        </a>
      </div>
    </fieldset>
    <fieldset>
      <button class='button' action='submit'>Go</button>
    </fieldset>
  </form>
</template>

<style lang='stylus' scoped>
@require '../styles/mixins'

.character-list
  text-align: center

.character-list-avatar
  size: 100px
  margin: 0.3em
  display: inline-block
  filter: drop-shadow(0px 2px 4px rgba(black, 0.5))

.selection-list
  width: 12em
</style>

<script>
import {getAvatarURL} from '../lib/f-list'
import * as storage from 'localforage'

export default {
  props: {
    characters: Array
  },
  data () {
    return {
      current: this.characters[0]
    }
  },
  mounted () {
    storage.getItem('character').then(value => {
      if (value) this.current = value
    })
  },
  methods: {
    submit () {
      this.$emit('character-list-submit', this.current)
    },
    select (name) {
      this.current = name
      storage.setItem('character', name)
    }
  },
  computed: {
    avatarURL () {
      return this.current && getAvatarURL(this.current)
    }
  }
}
</script>
