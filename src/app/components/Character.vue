<template lang="pug">
a(href='#')
  span.status-color(:class="character.status") &bull;
  strong.gender-color.ui-label(:class="character.gender", :data-character='character.name').
    {{ character.name }}
</template>

<script>
import Character from '../models/Character'

export default {
  props: {
    character: Character
  }
}
</script>
