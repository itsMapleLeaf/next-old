<template>
  <a href='#' class='flex ui-width-8 ui-link ui-fit-viewport' style='height: 100px; margin: 0.5rem'>
    <img class='flex-fixed ui-block' :src='avatarURL' />
    <div class='flex-grow flex-column' style='width: calc(100% - 100px); overflow-wrap: break-word'>
      <h3 class='flex-fixed ui-block ui-padding-2 gender-color' :class='gender'>
        {{ name }}
      </h3>
      <em class='flex-grow ui-block ui-small ui-padding-0' style='overflow-y: hidden'>
        <span class='status-color' :class='status'>{{ status }}</span>
        <span v-html="' - ' + statusmsg" v-if='statusmsg'></span>
      </em>
    </div>
  </a>
</template>

<script>
import Character from '../models/Character'
import {getAvatarURL} from '../f-list'

export default {
  props: {
    character: Character
  },

  computed: {
    name () { return this.character.name },
    gender () { return this.character.gender },
    status () { return this.character.status },
    statusmsg () { return this.character.statusmsg },
    avatarURL () { return getAvatarURL(this.name) }
  }
}
</script>
