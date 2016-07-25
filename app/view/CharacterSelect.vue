<template>
  <div class='ui-overlay'>
    <div class='ui-panel ui-text-center'>
      <form @submit.prevent='submit'>
        <div class='ui-margin-1'>
          <avatar :name='store.identity'></avatar>
        </div>
        <div class='ui-margin-1 ui-width-6 ui-height-9 ui-scroll-y'>
          <a href='#'
            v-for='name in store.characters'
            class='color-dark ui-block ui-padding-3'>
            {{name}}
          </a>
        </div>
        <div class='ui-margin-1'>
          <button class='ui-button'>Go</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Avatar from './CharacterAvatarLink.vue'
import store from '../store'

export default {
  components: {Avatar},

  data () {
    return { store }
  },

  methods: {
    submit () {}
  }
}
</script>
