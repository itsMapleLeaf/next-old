import * as React from 'react'
import styled from 'styled-components'

import { Icon } from 'src/app/components/Icon'

const Wrapper = styled.a`
  padding: 8px;
  opacity: 0.5;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`

export function ChatAction(props: { icon: string }) {
  return (
    <Wrapper href="#">
      <Icon name={props.icon} size={32} />
    </Wrapper>
  )
}
