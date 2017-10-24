import * as React from 'react'
import styled from 'styled-components'

import { Icon } from 'src/app/components/Icon'

type ChannelTabProps = {
  children: React.ReactNode
  active?: boolean
}

const Wrapper = styled.div`
  &:hover {
    opacity: ${(props: ChannelTabProps) => (props.active ? 1 : 0.75)};
  }

  opacity: ${(props: ChannelTabProps) => (props.active ? 1 : 0.5)};
`

const CloseIcon = styled.a`
  opacity: 0.3;

  &:hover {
    opacity: 0.7;
  }
`

export function ChatTab(props: ChannelTabProps) {
  const activeClass = props.active ? 'bg-color-main' : ''
  return (
    <Wrapper className={`${activeClass} flex-row flex-align-stretch`} active={props.active}>
      <a href="#" className="flex-grow padding">
        {props.children}
      </a>
      <CloseIcon href="#" className="flex-center padding no-line-height">
        <Icon name="close" />
      </CloseIcon>
    </Wrapper>
  )
}
