import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { getProfileURL } from 'src/api'
import { CharacterStore } from 'src/character/stores/CharacterStore'

type Props = {
  name: string
  characterStore?: CharacterStore
}

@inject('characterStore')
@observer
export class CharacterName extends React.Component<Props> {
  render() {
    const { name } = this.props
    const character = this.props.characterStore!.getCharacter(name)
    const genderClass = 'character-gender-' + character.gender.toLowerCase()
    return (
      <a href={getProfileURL(name)} target="_blank" className={`${genderClass} text-bold`}>
        {name}
      </a>
    )
  }
}
