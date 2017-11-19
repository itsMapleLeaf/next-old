import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'react-emotion'
import { CharacterName } from 'src/character/components/CharacterName'
import { ChatMessage, MessageType } from 'src/chat/models/ChatMessage'
import { parseBBC } from 'src/chat/util/bbc'
import { Stores } from 'src/stores'

const actionExp = /^\s*\/me\s*/

const Wrapper = styled('div')`
  &:nth-child(2n) {
    background-color: rgba(0, 0, 0, 0.15);
  }
`

type Props = {
  message: ChatMessage
}

type InjectedProps = {
  isSenderIgnored: boolean
}

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

function renderMessage(props: Props & InjectedProps) {
  if (props.isSenderIgnored) {
    return null
  }

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
        {sender && (
          <span className="margin-right">
            <CharacterName name={sender} />
          </span>
        )}
        <span className={`preserve-ws`} dangerouslySetInnerHTML={{ __html: parsedText }} />
      </div>
    </Wrapper>
  )
}

function storesToProps(stores: Stores, props: Props): InjectedProps {
  const { sender } = props.message
  return {
    isSenderIgnored: sender ? stores.chatStore.isIgnored(sender) : false,
  }
}

export const ChatMessageView: React.StatelessComponent<Props> = inject(storesToProps)(
  observer(renderMessage),
)
