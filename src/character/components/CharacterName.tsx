import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'react-emotion'
import { getProfileURL } from 'src/api'
import { CharacterStore } from 'src/character/stores/CharacterStore'

type Props = {
  name: string
  characterStore?: CharacterStore
}

const StatusDot = styled('span')`
  line-height: 0;
  font-size: 120%;
  vertical-align: middle;
`

function renderCharacterName(props: Props) {
  const { name } = props
  const { gender, status } = props.characterStore!.getCharacter(name)
  const genderClass = 'character-gender-' + gender.toLowerCase()
  const statusClass = 'character-status-' + status.toLowerCase()

  return (
    <a
      href={getProfileURL(name)}
      target="_blank"
      className={`${genderClass} text-bold`}
      data-character={name}
    >
      <StatusDot className={statusClass} title={status}>
        &bull;
      </StatusDot>{' '}
      {name}
    </a>
  )
}

export const CharacterName = inject('characterStore')(observer(renderCharacterName))
