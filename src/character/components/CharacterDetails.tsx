import * as React from 'react'

import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'

import { getAvatarURL } from 'src/api'
import { AppStore } from 'src/app/stores/AppStore'

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  display: block;
`

type Props = {
  name: string
  appStore?: AppStore
}

@inject('appStore')
@observer
export class CharacterDetails extends React.Component<Props> {
  @computed
  get character() {
    return this.props.appStore!.chat.characters.getCharacter(this.props.name)
  }

  render() {
    const { name } = this.props
    const { status, statusMessage } = this.character
    console.log('character detail status:', status)
    return (
      <div className="padding">
        <h2 style={{ margin: 0 }}>{name}</h2>

        <div className="spacer" />

        <Avatar src={getAvatarURL(name)} alt={`Avatar for ${name}`} />

        <div className="spacer" />

        <div className="bg-color-darken-1 padding text-italic text-small">
          {status}
          {statusMessage && ' - ' + statusMessage}
        </div>
      </div>
    )
  }
}
