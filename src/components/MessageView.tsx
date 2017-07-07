import * as React from 'react'
import { Message } from '../store/chat-state'

export default function MessageView(props: { message: Message }) {
  const { sender, text } = props.message
  return (
    <div style={{ margin: '0.4em 0.5em' }}>
      {sender.name}: <span dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  )
}
