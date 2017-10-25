import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { getProfileURL } from 'src/api'
import { CharacterStore } from 'src/character/stores/CharacterStore'

type Props = {
  name: string
  characterStore?: CharacterStore
}

const statusDotStyle: React.CSSProperties = {
  lineHeight: 0,
  fontSize: '120%',
  verticalAlign: 'middle',
}

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
        <span className={statusClass} title={status} style={statusDotStyle}>
          &bull;
        </span>{' '}
        {name}
      </a>
    )
  }
}
