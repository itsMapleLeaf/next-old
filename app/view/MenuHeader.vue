<template>
  <section>
    <header class='ui-margin-bottom-1'>
      <h2>Hi, {{firstName}}!</h2>
      <small class='ui-faded'>In the mood for some play?</small>
    </header>
    <span class='ui-margin-v-1'>
      <avatar :name='identity'></avatar>
    </span>
  </section>
</template>

<script>
import Avatar from './CharacterAvatarLink.vue'
import store from '../store'

export default {
  components: {Avatar},

  computed: {
    identity () { return store.identity },
    firstName () { return this.identity.split(' ')[0] }
  }
}
</script>
