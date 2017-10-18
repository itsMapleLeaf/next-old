<template>
  <overlay>
    <div style="text-align: center">
      <h1>hi</h1>
      <form @submit.prevent="submit">
        <fieldset>
          <input type="text" placeholder="Username" v-model="username">
        </fieldset>
        <fieldset>
          <input type="password" placeholder="Password" v-model="password">
        </fieldset>
        <fieldset>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  </overlay>
</template>

<script lang="ts">
import forage from 'localforage'
import Vue from 'vue'

const storageKey = 'Login_username'

export default Vue.extend({
  data() {
    return {
      username: '',
      password: ''
    }
  },

  async created() {
    const initialUsername = await forage.getItem<string>(storageKey)
    this.username = initialUsername || ''
  },

  methods: {
    submit() {
      this.$emit('submit', this.username, this.password)
    }
  },

  watch: {
    username() {
      forage.setItem(storageKey, this.username)
    }
  }
})
</script>
