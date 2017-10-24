import { computed } from 'mobx'
import { inject } from 'mobx-react'
import * as React from 'react'
import { Icon } from 'src/app/components/Icon'
import { AppStore } from 'src/app/stores/AppStore'
import { ChatInput } from 'src/chat/components/ChatInput'
import { ChatMessage } from 'src/chat/components/ChatMessage'
import { ShowOnDesktop } from 'src/common/components/responsive-utils'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-gap: 4px;

  // on mobile
  @media (max-width: 750px) {
    grid-template-rows: 40px 1fr 80px;
    grid-template-columns: 1fr;
    grid-template-areas: 'header' 'message-list' 'chat-input';
  }

  // on desktop
  @media (min-width: 750px) {
    grid-template-rows: 40px 80px 1fr 80px;
    grid-template-columns: 1fr 200px;
    grid-template-areas: 'header header' 'description description' 'message-list user-list'
      'chat-input chat-input';
  }
`

const Header = styled.div`
  grid-area: header;
  line-height: 0;

  > :not(:last-child) {
    margin-right: 8px;
  }
`

const MessageList = styled.div`grid-area: message-list;`

const Description = styled(ShowOnDesktop)`
  grid-area: description;
  height: 80px;
`

const UserList = styled(ShowOnDesktop)`grid-area: user-list;`

const UserListEntry = styled.div`
  font-weight: 500;

  :not(:last-child) {
    margin-bottom: 8px;
  }
`

const ChatInputWrapper = styled.div`grid-area: chat-input;`

type ChannelViewProps = JSX.IntrinsicElements['div'] & {
  store?: AppStore
  channelID: string
  onMenuClicked: () => void
  onMoreClicked: () => void
}

@inject('store')
export class ChannelView extends React.Component<ChannelViewProps> {
  @computed
  get channel() {
    return this.props.store!.chat.channels.getChannel(this.props.channelID)
  }

  render() {
    const { className } = this.props
    return (
      <Container className={`${className} fill-area`}>
        <Header className="bg-color-darken-2 flex-row flex-align-center padding">
          <a href="#" onClick={this.props.onMenuClicked}>
            <Icon name="menu" size={24} />
          </a>
          <div className="flex-grow">{this.channel.title}</div>
          <a href="#" onClick={this.props.onMoreClicked}>
            <Icon name="more-vert" size={24} />
          </a>
        </Header>
        <Description className="bg-color-darken-1 scroll-v padding preserve-ws">
          {this.channel.description}
        </Description>
        <MessageList className="bg-color-main flex-grow scroll-v">
          {this.channel.messages.map((message, i) => <ChatMessage key={i} message={message} />)}
        </MessageList>
        <UserList className="bg-color-darken-1 scroll-v padding">
          {this.channel.users.map(name => <UserListEntry key={name}>{name}</UserListEntry>)}
        </UserList>
        <ChatInputWrapper className="bg-color-main flex-row">
          <ChatInput className="flex-grow" />
        </ChatInputWrapper>
      </Container>
    )
  }
}
