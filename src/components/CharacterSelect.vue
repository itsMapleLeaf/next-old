<template>
  <div class="overlay-shade center-content">
    <div class="panel material-shadow">
      <form @submit.prevent='submit'>
        <h1>Who are you?</h1>
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
        </selection-list><br>
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
