import * as React from 'react'
import styled from 'react-emotion'

import { Icon, IconName } from '../../../ui/components'
import { colors, helpers } from '../../../ui/styles'

const ActionsContainer = styled.section`
  background: ${colors.flist4};
  padding: 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  section {
    display: flex;
    flex-direction: column;
    ${helpers.spacedChildrenVertical()};
  }
`

const ActionLink = styled.a`
  ${helpers.fadedHoverReveal()};
`

const Action = (props: { icon: IconName }) => (
  <ActionLink tabIndex={0}>
    <Icon name={props.icon} />
  </ActionLink>
)

export const Actions = () => (
  <ActionsContainer>
    <section>
      <Action icon="forum" />
      <Action icon="accountCircle" />
      <Action icon="accountMultiple" />
      <Action icon="info" />
    </section>
    <section>
      <Action icon="exit" />
    </section>
  </ActionsContainer>
)
