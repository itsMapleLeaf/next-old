<template lang="jade">
a.flex.ui-link.ui-fit-viewport(href='#', style='height: 100px; margin: 0.5rem; box-sizing: content-box', :data-character='character.name')
  img.ui-block.ui-no-click(:src='avatarURL', style='width: 100px; height: 100px')
  .flex-column.ui-width-5.ui-no-click.res.res-desktop(style='overflow-wrap: break-word')
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
