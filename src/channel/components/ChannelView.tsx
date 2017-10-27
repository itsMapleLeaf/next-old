import { action, computed, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { ChannelModeFilter } from 'src/channel/components/ChannelModeFilter'
import { ChannelMode } from 'src/channel/models/Channel'
import { ChannelStore } from 'src/channel/stores/ChannelStore'
import { ChatHeader } from 'src/chat/components/ChatHeader'
import { ChatInput } from 'src/chat/components/ChatInput'
import { AutoScroller } from 'src/common/components/AutoScroller'
import { ShowOnDesktop } from 'src/common/components/responsive-utils'
import { preventDefault } from 'src/common/util/react'
import { MessageComponent } from 'src/message/components/MessageComponent'
import { Message } from 'src/message/models/Message'
import styled from 'styled-components'
import { ChannelUsers } from './ChannelUsers'

const Container = styled.div`
  display: grid;
  grid-gap: 4px;

  // on mobile
  @media (max-width: 750px) {
    grid-template-rows: auto 1fr 80px;
    grid-template-columns: 1fr;
    grid-template-areas: 'chat-header' 'message-list' 'chat-input';
  }

  // on desktop
  @media (min-width: 750px) {
    grid-template-rows: auto 80px 1fr 80px;
    grid-template-columns: 1fr 200px;
    grid-template-areas: 'chat-header chat-header' 'description description'
      'message-list user-list' 'chat-input chat-input';
  }
`

const HeaderContainer = styled.div`grid-area: chat-header;`

const MessageList = styled.div`grid-area: message-list;`

const Description = styled(ShowOnDesktop)`
  grid-area: description;
  height: 80px;
`

const UserListContainer = styled(ShowOnDesktop)`grid-area: user-list;`

const ChatInputWrapper = styled.div`grid-area: chat-input;`

type ChannelViewProps = JSX.IntrinsicElements['div'] & {
  channelStore?: ChannelStore
  id: string
}

@inject('channelStore')
@observer
export class ChannelView extends React.Component<ChannelViewProps> {
  @observable displayedMode = 'both' as ChannelMode

  @action
  setDisplayedMode(mode: ChannelMode) {
    this.displayedMode = mode
  }

  @computed
  get channel() {
    return this.props.channelStore!.getChannel(this.props.id)
  }

  @computed
  get filteredMessages() {
    const { messages } = this.channel

    if (this.channel.mode !== 'both') {
      return messages
    }

    if (this.displayedMode === 'ads') {
      return messages.filter(msg => msg.type === 'lfrp')
    }
    if (this.displayedMode === 'chat') {
      return messages.filter(msg => msg.type === 'normal')
    }

    return messages
  }

  renderModeFilter(mode: ChannelMode, text: string) {
    return (
      <ChannelModeFilter
        key={mode}
        onClick={preventDefault(() => this.setDisplayedMode(mode))}
        text={text}
        active={this.displayedMode === mode}
      />
    )
  }

  render() {
    const { className } = this.props
    const { channel } = this

    return (
      <Container className={`${className} fill-area`}>
        <HeaderContainer>
          <ChatHeader title={channel.title} onMoreClicked={console.log}>
            {channel.mode === 'both' && [
              this.renderModeFilter('chat', 'Chat'),
              this.renderModeFilter('ads', 'Ads'),
              this.renderModeFilter('both', 'Both'),
            ]}
          </ChatHeader>
        </HeaderContainer>
        <Description className="bg-color-darken-1 scroll-v padding preserve-ws">
          {channel.description}
        </Description>
        <AutoScroller>
          <MessageList className="bg-color-main flex-grow scroll-v">
            {this.filteredMessages.map(this.renderMessage)}
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
