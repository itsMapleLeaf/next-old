import * as React from 'react'
import styled from 'styled-components'

type ChannelTabProps = {
  children: React.ReactNode
  active?: boolean
}

const Wrapper = styled.a`
  padding: 8px;

  &:hover {
    opacity: ${(props: ChannelTabProps) => (props.active ? 1 : 0.75)};
  }

  opacity: ${(props: ChannelTabProps) => (props.active ? 1 : 0.5)};
`

export function ChatTab(props: ChannelTabProps) {
  const activeClass = props.active ? 'bg-color-main' : ''
  return (
    <Wrapper href="#" style={{ padding: '8px' }} className={`${activeClass}`} active={props.active}>
      {props.children}
    </Wrapper>
  )
}
