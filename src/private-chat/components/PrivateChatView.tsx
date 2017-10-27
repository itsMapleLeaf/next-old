import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { ChatHeader } from 'src/chat/components/ChatHeader'
import { ChatInput } from 'src/chat/components/ChatInput'
import { AutoScroller } from 'src/common/components/AutoScroller'
import { MessageComponent } from 'src/message/components/MessageComponent'
import { PrivateChatStore } from 'src/private-chat/stores/PrivateChatStore'
import { getAvatarURL } from 'src/api'

type PrivateChatViewProps = {
  partner: string
  privateChatStore?: PrivateChatStore
}

@inject('privateChatStore')
@observer
export class PrivateChatView extends React.Component<PrivateChatViewProps> {
  @computed
  get privateChat() {
    return this.props.privateChatStore!.getPrivateChat(this.props.partner)
  }

  renderMessages() {
    const { messages } = this.privateChat
    return messages.map((message, i) => <MessageComponent key={i} message={message} />)
  }

  render() {
    return (
      <div className="flex-column fill-area">
        <ChatHeader title={this.props.partner}>
          <img
            className="block"
            src={getAvatarURL(this.props.partner)}
            style={{ width: '24px', height: '24px' }}
          />
        </ChatHeader>

        <div className="divider-v" />

        <AutoScroller>
          <div className="flex-grow bg-color-darken-1">{this.renderMessages()}</div>
        </AutoScroller>

        <div className="divider-v" />

        <div className="bg-color-main">
          <ChatInput />
        </div>
      </div>
    )
  }
}
