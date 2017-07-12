import sortBy from 'lodash/sortBy'
import { observer } from 'mobx-react'
import * as React from 'react'
import { Channel, Character, Message } from '../store/chat-state-models'
import CharacterView from './Character'
import MessageView from './Message'

function sortUserList(users: Character[]) {
  return sortBy(users, user => user.name.toLowerCase())
}

function renderMessageList(messages: Message[]) {
  return messages.map(msg => <MessageView message={msg} key={msg.id} />)
}

function renderUserList(users: Character[]) {
  return users.map(user =>
    <div key={user.name} style={{ width: '12em', margin: '0.4em 0.5em' }}>
      <CharacterView character={user} />
    </div>
  )
}

function ChannelView(props: { channel: Channel }) {
  const { messages, users, description } = props.channel
  const userList = Array.from(users.values())
  const sortedUsers = sortUserList(userList)
  return (
    <div className="flex-column" style={{ width: '100%', height: '100%' }}>
      <div
        className="scroll-v"
        style={{ padding: '0.5em', maxHeight: '5em' }}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div className="flex-grow flex-row">
        <div className="flex-grow scroll-v bg-2">
          {renderMessageList(messages)}
        </div>
        <div className="scroll-v">
          {renderUserList(sortedUsers)}
        </div>
      </div>
    </div>
  )
}

export default observer(ChannelView)
