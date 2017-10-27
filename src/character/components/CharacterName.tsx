import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { getProfileURL } from 'src/api'
import { CharacterStore } from 'src/character/stores/CharacterStore'
import styled from 'styled-components'

type Props = {
  name: string
  characterStore?: CharacterStore
}

const StatusDot = styled.span`
  line-height: 0;
  font-size: 120%;
  vertical-align: middle;
`

@inject('characterStore')
@observer
export class CharacterName extends React.Component<Props> {
  render() {
    const { name } = this.props
    const { gender, status } = this.props.characterStore!.getCharacter(name)
    const genderClass = 'character-gender-' + gender.toLowerCase()
    const statusClass = 'character-status-' + status.toLowerCase()

    return (
      <a href={getProfileURL(name)} target="_blank" className={`${genderClass} text-bold`}>
        <StatusDot className={statusClass} title={status}>
          &bull;
        </StatusDot>{' '}
        {name}
      </a>
    )
  }
}
