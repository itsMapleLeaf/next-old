<template lang="jade">
a.flex.ui-width-8.ui-link.ui-fit-viewport(href='#', style='height: 100px; margin: 0.5rem')
  img.flex-fixed.ui-block(:src='avatarURL')
  .flex-grow.flex-column(style='width: calc(100% - 100px); overflow-wrap: break-word')
    h3.flex-fixed.ui-block.ui-padding-2.gender-color(:class='gender')
      | {{ name }}
    em.flex-grow.ui-block.ui-small.ui-padding-0(style='overflow-y: hidden')
      user-status(:status='status', :statusmsg='statusmsg')
</template>

<script>
import Character from '../models/Character'
import UserStatus from './UserStatus.vue'
import {getAvatarURL} from '../f-list'

export default {
  components: {UserStatus},

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
