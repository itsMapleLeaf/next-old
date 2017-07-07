import { observer } from 'mobx-react'
import * as React from 'react'
import { Channel } from '../store/chat-state'
import MessageView from './MessageView'

function ChannelView(props: { channel: Channel }) {
  const { messages, users } = props.channel
  return (
    <div className="flex-row" style={{ width: '100%', height: '100%' }}>
      <div className="flex-grow scroll-v bg-2">
        {messages.map(msg => <MessageView message={msg} key={msg.id} />)}
      </div>
      <div className="scroll-v">
        {Array.from(users.values()).map(user =>
          <div key={user.name} style={{ width: '12em', margin: '0.4em 0.5em' }}>
            {user.name}
          </div>
        )}
      </div>
    </div>
  )
}

export default observer(ChannelView)
