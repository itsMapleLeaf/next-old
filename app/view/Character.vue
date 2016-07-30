<template>
  <a href='#'>
    <span :class="'status-color ' + character.status">•</span>
    <strong :class="'gender-color ' + character.gender" :data-character='character.name'>
      {{ character.name }}
    </strong>
  </a>
</template>

<script>
import Character from '../models/Character'

export default {
  props: {
    character: Character
  }
}
</script>
