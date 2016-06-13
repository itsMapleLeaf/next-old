<template>
  <div class="container">
    <form>
      <h1>Choose a Character</h1>
      <fieldset>
        <selection-list style="position: relative">
          <selection-list-item
            v-for='name in getUserCharacters'
            :selected='name === selectedCharacter'
            @click='setSelectedCharacter(name)'>
            <center>
              {{ name }}
              <i class='fa fa-check' v-show='name === selectedCharacter' style="position: absolute; margin-left: 0.2em"></i>
            </center>
          </selection-list-item>
        </selection-list>
      </fieldset>
      <fieldset>
        <button>Go</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
import SelectionList from './SelectionList.vue'
import SelectionListItem from './SelectionListItem.vue'
import {getUserCharacters, getDefaultCharacter} from '../vuex/getters'

export default {
  components: {
    SelectionList,
    SelectionListItem
  },

  data () {
    return {
      selectedCharacter: this.getDefaultCharacter
    }
  },

  methods: {
    setSelectedCharacter (name) {
      this.selectedCharacter = name
    }
  },

  vuex: {
    getters: {
      getUserCharacters,
      getDefaultCharacter
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/base'
@import '../styles/variables'
@import '../styles/mixins'

.container
  position: fixed 0
  box: middle center
  text-align: center
  background: rgba(0, 0, 0, 0.3)

form
  min-width: 10em
  background: fg-color
  padding: 2em 2em 1em
  shadow()

p
  text-align: center
</style>
