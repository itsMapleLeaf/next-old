
import Chatbox from './Chatbox.vue'
import Character from './Character.vue'
import ChatMessage from './ChatMessage.vue'

const template = `
  <div class='box vertical grow'>
    <div class='header box fg-color scroll room-info'>
      <span>{{{ viewState.description | bbcode }}}</span>
    </div>

    <div class='box divider'></div>

    <div class='box horizontal grow'>
      <div class='box grow scroll'>
        <chat-message v-for='msg in viewState.messages'
        :character='msg.character'
        :message='msg.message'>
        </chat-message>
      </div>

      <div class='box divider'></div>

      <div class='sidebar box fg-color scroll'>
        <character v-for='char in viewState.characters'
        class='character-list-item hover-darken'
        :character='char'></character>
      </div>
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
