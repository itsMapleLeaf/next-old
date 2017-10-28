import { action, computed, observable } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { ChannelModeFilter } from 'src/channel/components/ChannelModeFilter'
import { Channel, ChannelMode } from 'src/channel/models/Channel'
import { ChatHeader } from 'src/chat/components/ChatHeader'
import { ChatInput } from 'src/chat/components/ChatInput'
import { parseBBC } from 'src/chat/util/bbc'
import { AutoScroller } from 'src/common/components/AutoScroller'
import { ShowOnDesktop } from 'src/common/components/responsive-utils'
import { preventDefault } from 'src/common/util/react'
import { MessageComponent } from 'src/message/components/MessageComponent'
import { Message } from 'src/message/models/Message'
import { Stores } from 'src/stores'
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

type Props = JSX.IntrinsicElements['div'] & {
  id: string
}

type InjectedProps = {
  channel: Channel
  onMessage: (message: string) => void
}

function storesToProps(stores: Stores, props: Props): InjectedProps {
  const { channelStore, chatStore } = stores
  return {
    channel: channelStore.getChannel(props.id),
    onMessage(message) {
      chatStore.sendChannelMessage(props.id, message)
    },
  }
}

@inject(storesToProps)
@observer
class ChannelViewComponent extends React.Component<Props & InjectedProps> {
  @observable displayedMode = 'both' as ChannelMode

  @action
  setDisplayedMode(mode: ChannelMode) {
    this.displayedMode = mode
  }

  @computed
  get parsedDescription() {
    return { __html: parseBBC(this.props.channel.description) }
  }

  @computed
  get filteredMessages() {
    const { messages } = this.props.channel

    if (this.props.channel.mode !== 'both') {
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
    const { channel, className } = this.props

    return (
      <Container className={`${className} fill-area`}>
        <HeaderContainer>
          <ChatHeader>
            <div className="flex-row flex-align-center">
              <h3 className="flex-grow">{channel.title}</h3>
              <div className="flex-row">
                {channel.mode === 'both' && [
                  this.renderModeFilter('chat', 'Chat'),
                  this.renderModeFilter('ads', 'Ads'),
                  this.renderModeFilter('both', 'Both'),
                ]}
              </div>
            </div>
          </ChatHeader>
        </HeaderContainer>
        <Description
          className="bg-color-main scroll-v padding preserve-ws"
          dangerouslySetInnerHTML={this.parsedDescription}
        />
        <AutoScroller>
          <MessageList className="bg-color-darken-1 flex-grow scroll-v">
            {this.filteredMessages.slice(0, 300).map(this.renderMessage)}
          </MessageList>
        </AutoScroller>
        <UserListContainer className="bg-color-main scroll-v">
          <ChannelUsers users={channel.users} ops={channel.ops} />
        </UserListContainer>
        <ChatInputWrapper className="bg-color-main flex-row">
          <ChatInput className="flex-grow" onMessage={this.props.onMessage} />
        </ChatInputWrapper>
      </Container>
    )
  }

  renderMessage = (message: Message, i: number) => {
    return <MessageComponent key={i} message={message} />
  }
}

export const ChannelView: React.ComponentClass<Props> = ChannelViewComponent
