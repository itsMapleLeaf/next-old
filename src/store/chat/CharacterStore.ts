import Vue from 'vue'
import { Character } from './models'

type CharacterBatch = [string, string, string, string][]

export class CharacterStore {
  private characters = {} as Dictionary<Character>

  getCharacter(name: string) {
    return (
      this.characters[name] ||
      Vue.set(this.characters, name, new Character(name, 'None', 'offline'))
    )
  }

  handleCharacterBatch(batch: CharacterBatch) {
    const map = {} as Dictionary<Character>
    batch.forEach(([name, gender, status, statusMessage]) => {
      map[name] = new Character(name, gender, status, statusMessage)
    })
    this.characters = Object.assign(this.characters, map)
  }

  handleSocketCommand(cmd: string, params: any) {
    if (cmd === 'LIS') {
      this.handleCharacterBatch(params.characters)
    }

    if (cmd === 'NLN') {
      const char = this.getCharacter(params.identity)
      char.gender = params.gender
      char.status = 'online'
    }

    if (cmd === 'FLN') {
      const char = this.getCharacter(params.identity)
      char.status = 'offline'
    }

    if (cmd === 'STA') {
      const char = this.getCharacter(params.character)
      char.status = params.status
      char.statusMessage = params.statusmsg
    }
  }
}
