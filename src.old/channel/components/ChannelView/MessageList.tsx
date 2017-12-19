import { observer } from 'mobx-react'
import * as React from 'react'
import { cx } from 'react-emotion'
import { ChatMessageView } from 'src/chat/components/ChatMessageView'
import { ChatMessage } from 'src/chat/models/ChatMessage'
import { AutoScroller } from 'src/common/components/AutoScroller'
import { scrollVertical } from 'src/common/styles/helpers'

function renderMessage(msg: ChatMessage, i: number) {
  return <ChatMessageView key={i} message={msg} />
}

export const MessageList = observer(function(props: { messages: ChatMessage[] }) {
  return (
    <AutoScroller>
      <div className={cx('bg-color-darken-1', scrollVertical)}>
        {props.messages.map(renderMessage)}
      </div>
    </AutoScroller>
  )
})
