
import * as util from '../util'

const template = `
  <a :href="profileURL" target="_blank"
  :class="character.gender.toLowerCase()">
    {{character.name}}
  </a>
`

export default {
  template,

  props: {
    character: Object
  },

  data () {
    return {
      profileURL: util.getCharacterProfileURL(this.character.name)
    }
  }
}
