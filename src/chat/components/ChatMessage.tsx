import * as React from 'react'
import styled from 'styled-components'

const ChatMessageWrapper = styled.div`
  padding: 8px;

  &:nth-child(2n) {
    background-color: rgba(0, 0, 0, 0.15);
  }
`

const ChatMessageSender = styled.div`
  margin-right: 8px;
  font-weight: 500;
`

export function ChatMessage() {
  return (
    <ChatMessageWrapper className="flex-row">
      <ChatMessageSender>sender</ChatMessageSender>
      <div>message</div>
    </ChatMessageWrapper>
  )
}
