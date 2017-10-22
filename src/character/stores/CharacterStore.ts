import { observable } from 'mobx'
import { Character } from 'src/character/models/Character'

type CharacterBatch = [string, string, string, string][]

export class CharacterStore {
  characters = observable.map<Character>()

  getCharacter(name: string) {
    let char = this.characters.get(name)
    if (!char) {
      char = new Character(name, 'None', 'offline')
      this.characters.set(name, char)
    }
    return char
  }

  handleCharacterBatch(batch: CharacterBatch) {
    const newCharacters = {} as Dictionary<Character>
    batch.forEach(([name, gender, status, statusMessage]) => {
      newCharacters[name] = new Character(name, gender, status, statusMessage)
    })
    this.characters.merge(newCharacters)
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
