<template>
  <div class="shade box-center">
    <div class="panel shadow">
      <form @submit.prevent='submit'>
        <h1>Who are you?</h1>
        <selection-list :items='listItems' @selected='setSelectedCharacter' :init='defaultCharacter'></selection-list><br>
        <button>Go</button>
      </form>
    </div>
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

  computed: {
    listItems () {
      return this.userCharacters.map(name => {
        return { label: name, value: name }
      })
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
.panel
  text-align: center
</style>
