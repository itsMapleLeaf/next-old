<template lang='jade'>
a(href='#')
  span(:class="'status-color ' + character.status") &bull;
  strong(:class="'gender-color ' + character.gender", :data-character='character.name')
    | {{ character.name }}
</template>

<script>
import Character from '../models/Character'

export default {
  props: {
    character: Character
  }
}
</script>
