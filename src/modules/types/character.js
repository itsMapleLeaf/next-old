export type Character = {
  name: CharacterName,
  gender: Gender,
  status: CharacterStatus,
  relation: CharacterRelation[]
}

export type CharacterStatus = {
  state: CharacterStatusState,
  message: string
}

export type Gender
  = 'Male'
  | 'Female'
  | 'Transgender'
  | 'Herm'
  | 'Shemale'
  | 'Male-Herm'
  | 'Cunt-boy'
  | 'None'

export type CharacterStatusState
  = 'online'
  | 'looking'
  | 'busy'
  | 'away'
  | 'dnd'
  | 'idle'
  | 'offline'
  | 'crown' // ???

export type CharacterRelation
  = 'friend'
  | 'bookmark'
  | 'admin'
  | 'looking'
  | 'ignored'

export type CharacterName = string

export function createCharacter (name: CharacterName, gender: Gender): Character {
  return {
    name,
    gender,
    status: {
      state: 'online',
      message: ''
    },
    relation: []
  }
}
