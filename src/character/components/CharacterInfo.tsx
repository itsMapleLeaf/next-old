import * as React from 'react'
import styled from 'react-emotion'

import { helpers } from '../../ui/styles/index'
import { Avatar } from './Avatar'

const Container = styled.main`
  padding: 0.5rem;
  ${helpers.spacedChildrenVertical('0.8rem')};
`

const Status = styled.section`
  background: rgba(0, 0, 0, 0.25);
  padding: 0.4rem 0.5rem;
  font-size: 75%;
  font-style: italic;
`

export const CharacterInfo = (props: { name: string }) => (
  <Container>
    <h2>{props.name}</h2>
    <Avatar name={props.name} />
    <Status>status here</Status>
  </Container>
)
