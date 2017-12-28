import * as React from 'react'
import styled from 'react-emotion'

import { ConsoleView } from '../../../console/components/ConsoleView'
import { helpers } from '../../../ui/styles'
import { Actions } from './Actions'
import { Navigation } from './Navigation'

const Container = styled.main`
  ${helpers.fullscreen};
  ${helpers.grid({ columns: 'auto 12rem 1fr' })};
`

export const Chat = () => (
  <Container>
    <Actions />
    <Navigation />
    <ConsoleView />
  </Container>
)
