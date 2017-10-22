<template>
  <overlay>
    <div style="text-align: center; padding: 0rem 1rem 1rem">
      <h1>Choose your identity.</h1>
      <p>
        <img :src="avatarURL" :alt="'Avatar for ' + selected" />
      </p>
      <form @submit.prevent="submit">
        <fieldset>
          <select v-model="selected">
            <option v-for="name in characters" :key="name">{{ name }}</option>
          </select>
        </fieldset>
        <fieldset>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  </overlay>
</template>

<script lang="ts">
import Vue from 'vue'
import forage from 'localforage'
import { getAvatarURL } from '@/api'

const storageKey = 'CharacterSelect_lastCharacter'

export default Vue.extend({
  props: {
    characters: Array
  },

  data() {
    return {
      selected: ''
    }
  },

  computed: {
    avatarURL(): string {
      return getAvatarURL(this.selected)
    },
  },

  async created() {
    this.selected =
      (await forage.getItem<string>(storageKey)) || this.characters[0] || ''
  },

  methods: {
    submit() {
      this.$emit('submit', this.selected)
    },
  },

  watch: {
    selected(value) {
      forage.setItem(storageKey, value)
    },
  },
})
</script>
