import { characterStore } from 'src/stores'

export function handleCharacterSocketCommand(cmd: string, params: any) {
  if (cmd === 'LIS') {
    characterStore.handleCharacterBatch(params.characters)
  }

  if (cmd === 'NLN') {
    const char = characterStore.getCharacter(params.identity)
    char.setGender(params.gender)
    char.setStatus('online', '')
  }

  if (cmd === 'FLN') {
    const char = characterStore.getCharacter(params.character)
    char.setStatus('offline', '')
  }

  if (cmd === 'STA') {
    const char = characterStore.getCharacter(params.character)
    char.setStatus(params.status, params.statusmsg)
  }
}
