<template>
  <div class='ui-shade flex-center'>
    <div class='ui-panel'>
      <h2 class='ui-margin-1'>Hello, gorgeous.</h2>
      <form @submit.prevent='submit'>
        <div class='ui-margin-1 ui-input-icon-left'>
          <i class='ui-icon mdi mdi-account-circle'></i>
          <input type='text' placeholder='Username' v-model='username' />
        </div>
        <div class='ui-margin-1 ui-input-icon-left'>
          <i class='ui-icon mdi mdi-lock'></i>
          <input type='password' placeholder='••••••••' v-model='password' />
        </div>
        <div class='ui-margin-1'>
          <button class='ui-button' action='submit'>Go</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style></style>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    submit () {}
  }
}
</script>
