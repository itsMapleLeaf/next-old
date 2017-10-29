import * as React from 'react'
import styled from 'react-emotion'
import { CharacterName } from 'src/character/components/CharacterName'
import { parseBBC } from 'src/chat/util/bbc'
import { Message, MessageType } from 'src/message/models/Message'

const actionExp = /^\s*\/me\s*/

const Wrapper = styled('div')`
  &:nth-child(2n) {
    background-color: rgba(0, 0, 0, 0.15);
  }
`

function getHighlightClass(messageType: MessageType) {
  switch (messageType) {
    case 'normal':
      return ''
    case 'lfrp':
      return 'highlight-green'
    case 'admin':
      return 'highlight-red'
    case 'system':
      return ''
  }
}

export function MessageComponent(props: { message: Message }) {
  const { sender, text, type, date } = props.message
  const isAction = text.trim().startsWith('/me')
  const parsedText = parseBBC(text.replace(actionExp, ''))

  const actionClass = isAction ? 'text-italic' : ''
  const highlightClass = getHighlightClass(type)

  return (
    <Wrapper className={`${actionClass}`}>
      <div className={`padding ${highlightClass}`}>
        <span className="margin-left text-small text-italic faded float-right">
          [{date.toLocaleTimeString()}]
        </span>
        <span className="margin-right">
          <CharacterName name={sender} />
        </span>
        <span className={`preserve-ws`} dangerouslySetInnerHTML={{ __html: parsedText }} />
      </div>
    </Wrapper>
  )
}
