import * as React from 'react'
import styled from 'styled-components'

import { getAvatarURL } from 'src/api'

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  display: block;
`

export function CharacterDetails(props: { name: string }) {
  return (
    <div className="padding">
      <h2 style={{ margin: 0 }}>{props.name}</h2>

      <div className="spacer" />

      <Avatar src={getAvatarURL(props.name)} alt={`Avatar for ${props.name}`} />

      <div className="spacer" />

      {/* TODO: get status here */}
      <div className="bg-color-darken-1 padding text-italic text-small">
        Online - Around, maybe...
      </div>
    </div>
  )
}
