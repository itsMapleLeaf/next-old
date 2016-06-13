<template>
  <div class="container">
    <form>
      <h1>Choose a Character</h1>
      <fieldset>
        <div class='selection-list'>
          <a class='selection-list-item'
            v-for='name in getUserCharacters'>
            {{ name }}
          </a>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import {getUserCharacters} from '../vuex/getters'

export default {
  vuex: {
    getters: {
      getUserCharacters
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/base'
@import '../styles/variables'
@import '../styles/mixins'

.container
  position: fixed 0
  box: middle center
  text-align: center
  background: rgba(0, 0, 0, 0.3)

.selection-list
  height: 20em
  overflow-y: scroll

.selection-list-item
  display: block
  height: 2em

form
  min-width: 300px
  background: fg-color
  padding: 30px 30px
  shadow()

p
  text-align: center
</style>
