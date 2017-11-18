import * as React from 'react'
import styled from 'react-emotion'
import { Icon } from 'src/app/components/Icon'
import { preventDefault } from 'src/common/util/react'

export type ChatTabProps = {
  children?: React.ReactNode
  active?: boolean
  onActivate?: () => void
  onClose?: () => void
}

const Wrapper = styled<ChatTabProps, 'div'>('div')`
  &:hover {
    opacity: ${(props: ChatTabProps) => (props.active ? 1 : 0.75)};
  }

  opacity: ${(props: ChatTabProps) => (props.active ? 1 : 0.5)};
`

const CloseIcon = styled('a')`
  opacity: 0.3;

  &:hover {
    opacity: 0.7;
  }
`

export function NavigationTab(props: ChatTabProps) {
  const activeClass = props.active ? 'bg-color-main' : ''
  return (
    <Wrapper className={`${activeClass} flex-row flex-align-stretch`} active={props.active}>
      <a href="#" className="flex-grow padding" onClick={preventDefault(props.onActivate)}>
        {props.children}
      </a>
      {props.onClose && (
        <CloseIcon href="#" className="flex-center padding no-line-height">
          <Icon name="close" onClick={preventDefault(props.onClose)} />
        </CloseIcon>
      )}
    </Wrapper>
  )
}
