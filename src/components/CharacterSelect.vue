<template>
  <div>
    <h1>Choose your identity.</h1>
    <p>
      <img :src="avatarURL" :alt="`Avatar for ${selected}`" style="width: 100px; height: 100px">
    </p>
    <form @submit.prevent="submit">
      <fieldset>
        <select class="input" v-model="selected">
          <option v-for="name in characters" :key="name">{{ name }}</option>
        </select>
      </fieldset>
      <fieldset>
        <button class="button" formaction="submit">Enter</button>
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getAvatarURL } from '../api'

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

  get avatarURL() {
    return getAvatarURL(this.selected)
  }
}
</script>

