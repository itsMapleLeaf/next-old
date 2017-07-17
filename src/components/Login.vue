<template>
  <div>
    <h1>Hello, beautiful.</h1>
    <form @submit.prevent="submit">
      <fieldset>
        <input type="text" placeholder="Username" v-model="username">
      </fieldset>
      <fieldset>
        <input type="password" placeholder="••••••••" v-model="password">
      </fieldset>
      <fieldset>
        <button action="submit">Log in</button>
      </fieldset>
    </form>
    <p>{{ status }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    status: String
  }
})
export default class extends Vue {
  username = ''
  password = ''

  submit() {
    this.$emit('submit', this.username, this.password)
  }
}
</script>
