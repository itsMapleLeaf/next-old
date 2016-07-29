<template>
  <section>
    <header class='ui-margin-bottom-1'>
      <h2><slot name='header'></slot></h2>
      <small>
        <slot name='subtext'></slot>
      </small>
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
    character: String
  }
}
</script>
