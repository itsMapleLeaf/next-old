import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { getAvatarURL } from 'src/api'
import { CharacterName } from 'src/character/components/CharacterName'
import { ChatHeader } from 'src/chat/components/ChatHeader'
import { ChatInput } from 'src/chat/components/ChatInput'
import { AutoScroller } from 'src/common/components/AutoScroller'
import { MessageComponent } from 'src/message/components/MessageComponent'
import { PrivateChat } from 'src/private-chat/models/PrivateChat'
import { Stores } from 'src/stores'

type Props = {
  partner: string
}

type InjectedProps = {
  privateChat: PrivateChat
  onMessage: (message: string) => void
}

function storesToProps(stores: Stores, props: Props): InjectedProps {
  const { privateChatStore, chatStore } = stores

  return {
    privateChat: privateChatStore.getPrivateChat(props.partner),
    onMessage(message) {
      chatStore.sendPrivateMessage(props.partner, message)
    },
  }
}

@inject(storesToProps)
@observer
class PrivateChatViewComponent extends React.Component<Props & InjectedProps> {
  renderMessages() {
    const { messages } = this.props.privateChat
    return messages.map((message, i) => <MessageComponent key={i} message={message} />)
  }

  render() {
    return (
      <div className="flex-column fill-area">
        <ChatHeader>
          <div className="flex-row">
            <h3 className="flex-grow">
              <CharacterName name={this.props.partner} />
            </h3>
            <img
              className="block"
              src={getAvatarURL(this.props.partner)}
              style={{ width: '24px', height: '24px' }}
            />
          </div>
        </ChatHeader>

        <div className="divider-v" />

        <AutoScroller>
          <div className="flex-grow bg-color-darken-1">{this.renderMessages()}</div>
        </AutoScroller>

        <div className="divider-v" />

        <div className="bg-color-main">
          <ChatInput onMessage={this.props.onMessage} />
        </div>
      </div>
    )
  }
}

export const PrivateChatView = PrivateChatViewComponent as React.ComponentClass<Props>
