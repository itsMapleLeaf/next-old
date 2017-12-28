import * as React from 'react'
import styled, { css } from 'react-emotion'

import { Icon } from '../../../ui/components/Icon'
import { colors, helpers } from '../../../ui/styles'

type Props = {
  active?: boolean
  children?: React.ReactNode
  onActivate?: () => void
  onClose?: () => void
}

const activeStyle = css`
  opacity: 1;
  background: ${colors.flist0};
  &:hover {
    opacity: 1;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${helpers.fadedHoverReveal(0.3, 0.6)};

  ${(props: Props) => props.active && activeStyle};

  /* ${helpers.debugBorder}; */
`

const Content = styled.div`
  padding: 0.5rem;
  flex-grow: 1;

  display: flex;
  align-items: center;

  ${helpers.spacedChildrenHorizontal()};
`

const CloseButton = styled.div`
  padding: 0.5rem;
  line-height: 0;
`

export const NavigationTab = (props: Props) => (
  <Container {...props}>
    <Content tabIndex={0} onClick={() => props.onActivate && props.onActivate()}>
      {props.children}
    </Content>
    {props.onClose && (
      <CloseButton tabIndex={0} onClick={() => props.onClose && props.onClose()}>
        <Icon name="close" size={16} />
      </CloseButton>
    )}
  </Container>
)
