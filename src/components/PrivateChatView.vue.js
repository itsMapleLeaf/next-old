
import Chatbox from './Chatbox.vue'
import Character from './Character.vue'
import ChatMessage from './ChatMessage.vue'

const template = `
  <div class='box vertical grow'>
    <div class='box fg-color scroll header'>
      <character :character='viewState.character'></character>
      <span style="margin-left: 0.3em">
        - {{viewState.character.status}}, {{{viewState.character.statusMessage | bbcode}}}
      </span>
    </div>

    <div class='box divider'></div>

    <div class='box grow scroll'>
      <chat-message v-for='msg in viewState.messages'
      :character='msg.character'
      :message='msg.message'>
      </chat-message>
    </div>

    <div class='box divider'></div>

    <div class='box fg-color'>
      <chatbox></chatbox>
    </div>
  </div>
`

export default {
  template,

  components: {
    Chatbox,
    Character,
    ChatMessage
  },

  props: {
    viewState: Object
  }
}
