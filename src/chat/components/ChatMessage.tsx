import * as React from 'react'
import { Message } from 'src/message/models/Message'
import styled from 'styled-components'

const ChatMessageWrapper = styled.div`
  &:nth-child(2n) {
    background-color: rgba(0, 0, 0, 0.15);
  }
`

export function ChatMessage(props: { message: Message }) {
  return (
    <ChatMessageWrapper className="padding">
      <span className="margin-right text-bold">{props.message.sender}</span>
      <span>{props.message.text}</span>
    </ChatMessageWrapper>
  )
}
