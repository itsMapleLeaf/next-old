import * as React from 'react'
import { CharacterName } from 'src/character/components/CharacterName'
import { Message } from 'src/message/models/Message'
import styled from 'styled-components'

const actionExp = /^\s*\/me\s*/

const Wrapper = styled.div`
  &:nth-child(2n) {
    background-color: rgba(0, 0, 0, 0.15);
  }
`

export function MessageComponent(props: { message: Message }) {
  const { sender, text } = props.message
  const isAction = text.trim().startsWith('/me')
  const parsedText = text.replace(actionExp, '')

  const actionClass = isAction ? 'text-italic' : ''

  return (
    <Wrapper className={`padding ${actionClass}`}>
      <span className="margin-right">
        <CharacterName name={sender} />
      </span>
      <span className={`preserve-ws`} dangerouslySetInnerHTML={{ __html: parsedText }} />
    </Wrapper>
  )
}
