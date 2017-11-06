import * as React from "react"

import { inject, observer } from "mobx-react"
import styled from "react-emotion"

import { getAvatarURL, getProfileURL } from "src/api"
import { Character } from "src/character/models/Character"
import { Stores } from "src/stores"

const Avatar = styled("img")`
  width: 100px;
  height: 100px;
  display: block;
`

type Props = {
  name: string
}

type InjectedProps = {
  character: Character
}

function storesToProps(stores: Stores, props: Props): InjectedProps {
  const character = stores.characterStore.getCharacter(props.name)
  return {
    character,
  }
}

function renderCharacterDetails(props: Props & InjectedProps) {
  const { name, character } = props
  const { status, hasStatusMessage, parsedStatusMessage } = character

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
        {hasStatusMessage && (
          <span>
            {" - "}
            <span dangerouslySetInnerHTML={parsedStatusMessage} />
          </span>
        )}
      </div>
    </div>
  )
}

export const CharacterDetails: React.ComponentClass<Props> = inject(storesToProps)(
  observer(renderCharacterDetails),
)
