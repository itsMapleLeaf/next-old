import * as React from 'react'
import { Message } from '../store/chat-state-models'
import CharacterView from './Character'

export default function MessageView(props: { message: Message }) {
  const { sender, text } = props.message
  return (
    <div style={{ margin: '0.4em 0.5em' }}>
      <span style={{ marginRight: '0.5em' }}>
        <CharacterView character={sender} />
      </span>
      <span dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  )
}
