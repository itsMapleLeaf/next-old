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

export default Vue.extend({
  data() {
    return {
      username: '',
      password: ''
    }
  },
  async created() {
    const auth = await forage.getItem<{ account: string }>('auth') || {}
    this.username = auth.account || ''
  },
  methods: {
    submit() {
      this.$emit('submit', this.username, this.password)
    }
  }
})
</script>
