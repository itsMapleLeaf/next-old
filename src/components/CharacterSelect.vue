<template>
  <form @submit.prevent="submit">
    <fieldset>
      <select v-model="selected">
        <option v-for="name in characters" :key="name">{{ name }}</option>
      </select>
    </fieldset>
    <fieldset>
      <button formaction="submit">Enter</button>
    </fieldset>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    characters: Array
  }
})
export default class extends Vue {
  characters: string[]
  selected = this.characters[0]

  submit() {
    this.$emit('submit', this.selected)
  }
}
</script>

