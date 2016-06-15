<template>
  <div class="overlay-shade">
    <form class="panel material-shadow" @submit.prevent='submit'>
      <h1>Choose a Character</h1>
      <selection-list style="position: relative">
        <selection-list-item
          v-for='name in userCharacters'
          :selected='name === selectedCharacter'
          @click='setSelectedCharacter(name)'>
          <center>
            {{ name }}
            <i class='fa fa-check' v-show='name === selectedCharacter' style="position: absolute; margin-left: 0.2em"></i>
          </center>
        </selection-list-item>
      </selection-list>
      <button>Go</button>
    </form>
  </div>
</template>

<script>
import SelectionList from './SelectionList.vue'
import SelectionListItem from './SelectionListItem.vue'
import {userCharacters, defaultCharacter, account, apiTicket} from '../vuex/getters'
import {chooseCharacter, connectToChatServer, setCurrentOverlay} from '../vuex/actions'

export default {
  components: {
    SelectionList,
    SelectionListItem
  },

  data () {
    return {
      selectedCharacter: this.defaultCharacter
    }
  },

  methods: {
    setSelectedCharacter (name) {
      this.selectedCharacter = name
    },

    submit () {
      this.setCurrentOverlay('')

      this.chooseCharacter(this.selectedCharacter)
      this.connectToChatServer(this.account, this.apiTicket, this.selectedCharacter)
      .then(() => {
        this.setCurrentOverlay('channel-list')
      })
      .catch(() => {
        this.setCurrentOverlay('login')
      })
    }
  },

  vuex: {
    actions: {
      chooseCharacter,
      connectToChatServer,
      setCurrentOverlay
    },
    getters: {
      userCharacters,
      defaultCharacter,
      account,
      apiTicket
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/base'
@import '../styles/variables'
@import '../styles/components'

form
  width: 20em !important

p
  text-align: center
</style>
