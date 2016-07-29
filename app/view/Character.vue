<template>
  <span>
    <span :class="'status-color ' + character.status">•</span>
    <strong :class="'gender-color ' + character.gender">{{ character.name }}</strong>
  </span>
</template>

<script>
import Character from '../models/Character'

export default {
  props: {
    character: Character
  }
}
</script>
