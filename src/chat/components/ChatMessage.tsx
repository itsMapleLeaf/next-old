import * as React from 'react'
import styled from 'styled-components'

const ChatMessageWrapper = styled.div`
  &:nth-child(2n) {
    background-color: rgba(0, 0, 0, 0.15);
  }
`

export function ChatMessage() {
  return (
    <ChatMessageWrapper className="flex-row padding">
      <div className="margin-right text-bold">sender</div>
      <div>message</div>
    </ChatMessageWrapper>
  )
}
