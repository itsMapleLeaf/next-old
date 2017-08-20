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

<script>
import forage from 'localforage'
import { getAvatarURL } from '../api'

export default {
  computed: {
    characters() {
      return this.$store.state.user.characters
    },
    avatarURL() {
      return getAvatarURL(this.selected)
    },
  },
  data() {
    return {
      selected: '',
    }
  },
  async created() {
    this.selected =
      (await forage.getItem('lastCharacter')) || this.characters[0] || ''
  },
  methods: {
    submit() {
      this.$emit('submit', this.selected)
    },
  },
  watch: {
    selected(value) {
      forage.setItem('lastCharacter', value)
    },
  },
}
</script>
