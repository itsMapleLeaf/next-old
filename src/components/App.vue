<template>
  <login @submit="handleLoginSubmit">
  </login>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  components: {
    'login': require('./Login.vue').default
  }
})
export default class extends Vue {
  handleLoginSubmit(username: string, password: string) {
    console.log(username, password)
  }
}
</script>

