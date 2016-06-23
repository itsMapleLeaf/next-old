
import {userData} from '../vuex/getters'

const template = `
  <div
  class='chatbox'
  contenteditable
  :placeholder="placeholder"
  maxlength="4096"
  @keydown.enter="messageSent($event)"
  @input="fixContent"
  v-el:textarea></div>
`

export default {
  template,

  computed: {
    placeholder () {
      if (this.userData.character === '') {
        return 'Not chatting quite yet...'
      } else {
        return `Chatting as ${this.userData.character}...`
      }
    }
  },

  methods: {
    getContent () {
      return this.$els.textarea.innerText.trim()
    },

    setContent (text) {
      this.$els.textarea.innerText = text
    },

    messageSent (event) {
      if (!event.shiftKey) {
        this.$dispatch('chatbox-message-sent', this.getContent())
        this.setContent('')
        event.preventDefault()
      }
    },

    fixContent () {
      // this seems useless but things are way less buggy and awkward with this
      if (this.getContent() === '') {
        this.setContent('')
      }
    }
  },

  vuex: {
    getters: {
      userData
    }
  }
}
