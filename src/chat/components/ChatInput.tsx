import * as React from 'react'
import styled from 'styled-components'

const ChatInputTextarea = styled.textarea`
  padding: 8px;
  resize: none;
`

export function ChatInput() {
  return <ChatInputTextarea rows={3} placeholder="Say something..." className="fill-area" />
}
