import * as React from 'react'

import { inject, observer } from 'mobx-react'
import styled from 'react-emotion'

import { getAvatarURL, getProfileURL } from 'src/api'
import { parseBBC } from 'src/chat/util/bbc'
import { Stores } from 'src/stores'

const Avatar = styled('img')`
  width: 100px;
  height: 100px;
  display: block;
`

type Props = {
  name: string
}

type InjectedProps = {
  status: string
  statusMessage: string
}

function storesToProps(stores: Stores, props: Props): InjectedProps {
  const character = stores.characterStore.getCharacter(props.name)
  return {
    status: character.status,
    statusMessage: character.statusMessage,
  }
}

function renderCharacterDetails(props: Props & InjectedProps) {
  const { name, status, statusMessage } = props

  return (
    <div className="padding">
      <a href={getProfileURL(name)} target="_blank">
        <h2 style={{ margin: 0 }}>{name}</h2>
      </a>

      <div className="spacer" />

      <a href={getProfileURL(name)} target="_blank">
        <Avatar src={getAvatarURL(name)} alt={`Avatar for ${name}`} key={name} />
      </a>

      <div className="spacer" />

      <div className="bg-color-darken-1 padding text-italic text-small">
        <span className={`character-status-${status.toLowerCase()}`}>{status}</span>
        {statusMessage.trim() !== '' && (
          <span dangerouslySetInnerHTML={{ __html: ' - ' + parseBBC(statusMessage) }} />
        )}
      </div>
    </div>
  )
}

export const CharacterDetails: React.ComponentClass<Props> = inject(storesToProps)(
  observer(renderCharacterDetails),
)
