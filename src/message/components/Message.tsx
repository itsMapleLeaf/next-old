import * as React from 'react'
import styled, { css } from 'react-emotion'

const actionStyle = css`
  font-style: italic;
`

const MessageContainer = styled.div`
  padding: 0.3rem 0.6rem;
  ${({ isAction }: { isAction: boolean }) => isAction && actionStyle};
`

const MessageSender = styled.span`
  padding-right: 0.6rem;
  font-weight: 500;
`

const MessageText = styled.span``

const MessageDate = styled.span`
  opacity: 0.5;
  font-style: italic;
  padding-right: 0.8rem;
  font-size: 75%;
`

type Props = {
  sender?: string
  text: string
  timestamp?: string
}

export const Message = (props: Props) => {
  const isAction = props.text.startsWith('/me')
  const parsedText = props.text.replace(/^\/me\s*/, '')

  return (
    <MessageContainer isAction={isAction}>
      {props.timestamp && <MessageDate>[{props.timestamp}]</MessageDate>}
      {props.sender && <MessageSender>{props.sender}</MessageSender>}
      <MessageText>{parsedText}</MessageText>
    </MessageContainer>
  )
}
