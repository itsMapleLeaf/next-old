import * as React from 'react'
import styled from 'react-emotion'

import { ChatInput } from '../../chat/components/ChatInput'
import { lipsumLine } from '../../common/helpers/lipsum'
import { Message } from '../../message/components/Message'
import { colors, helpers } from '../../ui/styles'

const Container = styled.main`
  ${helpers.grid({
    rows: '1fr auto',
  })};
`

const MessageList = styled.section`
  background: ${colors.flist4};
`

const ChatInputContainer = styled.div`
  background: ${colors.flist1};
  padding: 0.5rem;
`

export const ConsoleView = () => (
  <Container>
    <MessageList>
      <Message
        sender="some sender name"
        text={lipsumLine}
        timestamp={new Date().toLocaleTimeString()}
      />
      <Message text={lipsumLine} timestamp={new Date().toLocaleTimeString()} />
      <Message
        sender="some sender name"
        text={'/me ' + lipsumLine}
        timestamp={new Date().toLocaleTimeString()}
      />
      <Message
        sender="some sender name"
        text={lipsumLine}
        timestamp={new Date().toLocaleTimeString()}
      />
    </MessageList>
    <ChatInputContainer>
      <ChatInput />
    </ChatInputContainer>
  </Container>
)
