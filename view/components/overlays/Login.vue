<template>
  <div class='ui overlay flex col' transition='fade'>
    <div class='ui panel' style='margin-bottom: 1em'>
      <h1>Hi there!</h1>
      <form class='ui form' @submit.prevent='submit'>
        <div class='ui field text-input icon left'>
          <i class='fa fa-user'></i>
          <input type="text" placeholder="Username" v-model="username" :disabled='disabled'>
        </div>
        <div class='ui field text-input icon left'>
          <i class='fa fa-lock'></i>
          <input type="password" placeholder="Password" v-model="password" :disabled='disabled'>
        </div>
        <div class='field'>
          <label>
            <input type='checkbox' tabindex='0' /> Remember me
          </label>
        </div>
        <div class='ui field'>
          <button class='ui button' action="submit" :disabled='disabled'>Go</button>
        </div>
      </form>
      <span>{{status}}</span>
    </div>
    <center class='ui small subtle'>
      <em>
        <p>fchat-next alpha v0.1.0</p>
        <p>
          <i class='fa fa-code'></i> with
          <i class='fa fa-heart'></i> by
          <a class='ui link' href='https://www.f-list.net/c/alexander%20grapevine/' target='_blank'>Alexander Grapevine</a><br />
          Note me for questions or concerns.
        </p>
        <p><a class='ui link' href='https://github.com/Kingdaro/fchat'>Github Repository</a></p>
        <p>Warning: buggy and incomplete. Many things do not work.</p>
      </em>
    </center>
  </div>
</template>

<style lang="stylus" scoped>
.panel
  width: 14em
</style>

<script>
import {sendLoginRequest} from '../../lib/flist'
import {LoginRequest, LoginSuccess} from '../../lib/events'

const errorMessage = `
Could not connect to F-List website.
They're either doing maintenance,
or someone spilled coke on the servers again.
`

export default {
  data () {
    return {
      username: '',
      password: '',
      status: '',
      disabled: false
    }
  },

  methods: {
    submit () {
      sendLoginRequest(this.username, this.password)
      .then(data => {
        const correctedDataBecauseTheAPIIsReallyInconsistentAndStupid = {
          characters: data.characters,
          bookmarks: data.bookmarks.map(({name}) => name),
          friends: data.friends.map(({ source_name, dest_name }) => {
            return { source: dest_name, dest: source_name }
          }),
          ticket: data.ticket
        }

        this.$dispatch(LoginSuccess, correctedDataBecauseTheAPIIsReallyInconsistentAndStupid)
      })
      .catch(err => {
        this.status = err || errorMessage
      })
      .then(() => {
        this.disabled = false
        this.password = ''
      })

      this.$dispatch(LoginRequest, this.username)
      this.disabled = true
    }
  }
}
</script>
