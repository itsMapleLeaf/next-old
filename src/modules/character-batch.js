import {Character, CharacterName, Gender, CharacterStatusState} from 'modules/types'
import {createCharacter} from 'modules/constructors'
import {store} from 'modules/store'

type BatchEntry = [CharacterName, Gender, CharacterStatusState, string]

export default class CharacterBatch {
  count: number
  items: Character[]

  constructor () {
    this.count = 0
    this.items = []
  }

  setCount (count: number) {
    this.count = count
  }

  addBatch (batch: BatchEntry[]): boolean {
    this.items = this.items.concat(batch.map(entry => {
      const [name, gender, state, message] = entry
      const char: Character = createCharacter(name, gender)
      char.status = { state, message }
      char.relation = store.getCharacterRelation(char)
      return char
    }))
    return this.count === this.items.length
  }
}
