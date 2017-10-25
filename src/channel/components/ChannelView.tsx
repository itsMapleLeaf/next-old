import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { ChannelStore } from 'src/channel/stores/ChannelStore'
import { ChatInput } from 'src/chat/components/ChatInput'
import { AutoScroller } from 'src/common/components/AutoScroller'
import { ShowOnDesktop } from 'src/common/components/responsive-utils'
import { MessageComponent } from 'src/message/components/MessageComponent'
import { Message } from 'src/message/models/Message'
import styled from 'styled-components'
import { ChannelUsers } from './ChannelUsers'

const Container = styled.div`
  display: grid;
  grid-gap: 4px;

  // on mobile
  @media (max-width: 750px) {
    grid-template-rows: 1fr 80px;
    grid-template-columns: 1fr;
    grid-template-areas: 'message-list' 'chat-input';
  }

  // on desktop
  @media (min-width: 750px) {
    grid-template-rows: 80px 1fr 80px;
    grid-template-columns: 1fr 200px;
    grid-template-areas: 'description description' 'message-list user-list' 'chat-input chat-input';
  }
`

const MessageList = styled.div`grid-area: message-list;`

const Description = styled(ShowOnDesktop)`
  grid-area: description;
  height: 80px;
`

const UserListContainer = styled(ShowOnDesktop)`grid-area: user-list;`

const ChatInputWrapper = styled.div`grid-area: chat-input;`

type ChannelViewProps = JSX.IntrinsicElements['div'] & {
  channelStore?: ChannelStore
  channelID: string
  onMenuClicked: () => void
  onMoreClicked: () => void
}

@inject('channelStore')
@observer
export class ChannelView extends React.Component<ChannelViewProps> {
  @computed
  get channel() {
    return this.props.channelStore!.getChannel(this.props.channelID)
  }

  render() {
    const { className } = this.props
    const { channel } = this

    return (
      <Container className={`${className} fill-area`}>
        <Description className="bg-color-darken-1 scroll-v padding preserve-ws">
          {channel.description}
        </Description>
        <AutoScroller>
          <MessageList className="bg-color-main flex-grow scroll-v">
            {channel.messages.map(this.renderMessage)}
          </MessageList>
        </AutoScroller>
        <UserListContainer className="bg-color-darken-1 scroll-v">
          <ChannelUsers users={channel.users} ops={channel.ops} />
        </UserListContainer>
        <ChatInputWrapper className="bg-color-main flex-row">
          <ChatInput className="flex-grow" />
        </ChatInputWrapper>
      </Container>
    )
  }

  renderMessage = (message: Message, i: number) => {
    return <MessageComponent key={i} message={message} />
  }
}
