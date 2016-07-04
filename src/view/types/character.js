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
  | 'Male-herm'
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
