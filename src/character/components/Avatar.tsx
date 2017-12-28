import * as React from 'react'
import styled from 'react-emotion'

import { getAvatarURL } from '../../api'

type Props = {
  name: string
  size?: string
}

const resolveSize = (props: Props) => props.size || '100px'

const AvatarImage = styled.img`
  width: ${resolveSize};
  height: ${resolveSize};
`

export const Avatar = (props: Props) => (
  <AvatarImage {...props} src={getAvatarURL(props.name)} alt={`Avatar for ${props.name}`} />
)
