<template>
  <section>
    <header class='ui-margin-bottom-1'>
      <h2>{{ header }}</h2>
      <small class='ui-faded'>{{ subtext }}</small>
    </header>
    <span class='ui-margin-v-1'>
      <avatar :name='character'></avatar>
    </span>
  </section>
</template>

<script>
import Avatar from './CharacterAvatarLink.vue'

export default {
  components: {Avatar},

  props: {
    header: String,
    subtext: String,
    character: String
  }
}
</script>
