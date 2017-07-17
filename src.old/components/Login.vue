<template>
  <form @submit.prevent='submit'>
    <fieldset>
      <h2>Hello, beautiful.</h2>
    </fieldset>
    <fieldset>
      <div class='form-icon-input'>
        <i class='mdi mdi-account-circle'></i>
        <input type='text' placeholder='Username' v-model='account'/>
      </div>
    </fieldset>
    <fieldset>
      <div class='form-icon-input'>
        <i class='mdi mdi-lock'></i>
        <input type='password' placeholder='••••••••' v-model='password'/>
      </div>
    </fieldset>
    <fieldset>
      <toggle v-model='remember'>Remember me</toggle>
    </fieldset>
    <fieldset>
      <button class='form-button' action='submit'>Go</button>
    </fieldset>
    <fieldset>
      <div class='status'>
        {{ status }}
      </div>
    </fieldset>
  </form>
</template>

<script>
import Toggle from './Toggle.vue'
import * as flist from '../lib/f-list'
import * as storage from 'localforage'
import {store} from '../store'

export default {
  components: {
    Toggle,
  },
  data() {
    return {
      account: '',
      password: '',
      remember: false,
      status: '',
    }
  },
  async created() {
    const auth = await storage.getItem('auth')
    if (auth) {
      this.account = auth.account
      this.remember = true
    }
  },
  methods: {
    submit() {
      this.status = ''
      store.login(this.account, this.password, this.remember).catch(err => {
        this.status = err
      })
    },
  },
}
</script>

<style lang='stylus' scoped>
@require 'vars'

form
  text-align: center

.status
  max-width: 16em
</style>
