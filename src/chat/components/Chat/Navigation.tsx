import * as React from 'react'
import styled from 'react-emotion'

import { ChannelTab } from '../../../channel/components/ChannelTab'
import { CharacterInfo } from '../../../character/components/CharacterInfo'
import { ConsoleTab } from '../../../console/components/ConsoleTab'
import { PrivateChatTab } from '../../../privateChat/components/PrivateChatTab'
import { colors, helpers } from '../../../ui/styles'

const Container = styled.section`
  ${helpers.grid({ rows: 'auto 1fr' })};
`

const CharacterInfoContainer = styled.section`
  background: ${colors.flist2};
`

const TabsContainer = styled.section`
  background: ${colors.flist3};
  overflow-y: auto;
`

export const Navigation = () => (
  <Container>
    <CharacterInfoContainer>
      <CharacterInfo name={'Ian Nightingale'} />
    </CharacterInfoContainer>
    <TabsContainer>
      <ConsoleTab />
      <ChannelTab title="Frontpage" />
      <ChannelTab title="Fantasy" />
      <ChannelTab title="Story Driven LFRP" />
      <PrivateChatTab partner="Athena Light" />
      <PrivateChatTab partner="Subaru-chan" />
    </TabsContainer>
  </Container>
)
